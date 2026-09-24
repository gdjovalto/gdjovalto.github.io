<#
    check-integrity.ps1
    Verifica a integridade do sítio estático do GD Jovalto:
      - todas as ligações e imagens locais apontam para ficheiros existentes;
      - todos os ficheiros de data/ atribuem a window.JOVALTO.

    Uso:
        powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1

    Código de saída: 0 = OK, 1 = problemas encontrados.
#>
[CmdletBinding()]
param(
    [string]$Root
)

$ErrorActionPreference = 'Stop'

# Determina a raiz do projeto (a pasta acima de tools\).
# Nota: $PSScriptRoot não é fiável em valores por omissão de parâmetros no
# Windows PowerShell 5.1, pelo que a resolução é feita no corpo do script.
if ([string]::IsNullOrWhiteSpace($Root)) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $Root = Split-Path -Parent $scriptDir
}
$Root = (Resolve-Path -LiteralPath $Root).Path
$sourceRoot = Split-Path -Parent $Root
Write-Verbose "Raiz do projeto: $Root"
$problems = New-Object System.Collections.Generic.List[string]
$checked  = 0
$external = 0

$htmlFiles = @(Get-ChildItem -Path $Root -Recurse -Filter *.html -File |
    Where-Object { $_.FullName -notmatch '\\wix-export\\' })

foreach ($file in $htmlFiles) {
    $html = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
    $found = [regex]::Matches($html, '(?i)\b(?:href|src)\s*=\s*"([^"]+)"')
    foreach ($match in $found) {
        $target = $match.Groups[1].Value.Trim()
        if ($target -eq '' -or $target.StartsWith('#')) { continue }
        if ($target -match '^(?i)(https?:|mailto:|tel:|data:|javascript:)') { $external++; continue }

        $path = $target.Split('#')[0]            # remove âncora
        $path = $path.Split('?')[0]              # remove query
        if ($path -eq '') { continue }
        $path = [System.Uri]::UnescapeDataString($path)

        $full = Join-Path $file.Directory.FullName $path
        $checked++
        if (-not (Test-Path -LiteralPath $full)) {
            $problems.Add("Ligação quebrada em $($file.FullName.Replace($Root,'.')): $target")
        }
        # Em file:// um diretório não serve index.html: exigir página explícita
        elseif ($path.EndsWith('/') -or $path.EndsWith('\')) {
            $problems.Add("Ligação a diretório (não funciona em file://) em $($file.Name): $target")
        }
    }
}

# --- Ficheiros de dados --------------------------------------------------------
$dataDir = Join-Path $Root 'data'
if (Test-Path -LiteralPath $dataDir) {
    foreach ($js in Get-ChildItem -Path $dataDir -Filter *.js -File) {
        $checked++
        $content = Get-Content -LiteralPath $js.FullName -Raw -Encoding UTF8
        if ($content -notmatch 'window\.JOVALTO') {
            $problems.Add("Ficheiro de dados sem atribuição a window.JOVALTO: $($js.Name)")
        }
    }
} else {
    $problems.Add('Pasta data/ não encontrada.')
}

# --- Caminhos de ficheiros referenciados nos dados --------------------------
# As listas são renderizadas por JavaScript, pelo que os seus caminhos não
# aparecem no HTML. São verificados aqui a partir do texto dos ficheiros de dados.
$dataPathRegex = [regex]'"(?<p>(?:assets|Logos|docs|tools)/[^"]+|[A-Za-z0-9_\-]+\.(?:pdf|png|jpg|jpeg|avif|svg))"'
if (Test-Path -LiteralPath $dataDir) {
    foreach ($js in Get-ChildItem -Path $dataDir -Filter *.js -File) {
        $content = Get-Content -LiteralPath $js.FullName -Raw -Encoding UTF8
        foreach ($m in $dataPathRegex.Matches($content)) {
            $candidate = $m.Groups['p'].Value
            $full = Join-Path $Root $candidate
            $checked++
            # Os originais documentais vivem ao lado da pasta website/ e não
            # são publicados. Ativos servidos pelo site têm sempre de existir
            # dentro de website/; apenas fontes de arquivo podem usar a pasta-mãe.
            $isPublishedAsset = $candidate -match '^(?:assets|docs|tools)/'
            $sourceFull = Join-Path $sourceRoot $candidate
            if (-not (Test-Path -LiteralPath $full) -and
                ($isPublishedAsset -or -not (Test-Path -LiteralPath $sourceFull))) {
                $problems.Add("Caminho inexistente referenciado em $($js.Name): $candidate")
            }
        }
    }
}

Write-Output ''
Write-Output ("Ficheiros HTML analisados : " + $htmlFiles.Count)
Write-Output ("Ligações locais verificadas: " + $checked)
Write-Output ("Ligações externas ignoradas : " + $external)
Write-Output ''

if ($problems.Count -eq 0) {
    Write-Output 'INTEGRIDADE OK - nenhuma ligação quebrada e todos os dados carregados.'
    exit 0
}

Write-Output ("PROBLEMAS ENCONTRADOS: " + $problems.Count)
$problems | ForEach-Object { Write-Output ('  - ' + $_) }
exit 1
