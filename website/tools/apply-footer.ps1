<#
    apply-footer.ps1
    Injeta o rodapé comum (tools/rodape.tpl) nos ficheiros HTML que contenham
    o marcador  <!-- @@RODAPE@@ --> , substituindo {{P}} pelo prefixo relativo
    correto ("../" para subpastas, "" para a raiz).

    É uma ferramenta de AUTORIA (manutenção). O sítio publicado não precisa dela:
    os ficheiros finais ficam com o rodapé já escrito.

    Uso:
        powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1
        powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1 -Check
#>
[CmdletBinding()]
param(
    [string]$Root,
    [switch]$Check
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($Root)) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $Root = Split-Path -Parent $scriptDir
}
$Root = (Resolve-Path -LiteralPath $Root).Path

$tplPath = Join-Path $Root 'tools\rodape.tpl'
if (-not (Test-Path -LiteralPath $tplPath)) { throw "Modelo não encontrado: $tplPath" }
$modelo = Get-Content -LiteralPath $tplPath -Raw -Encoding UTF8
$marcador = '<!-- @@RODAPE@@ -->'

$alterados = 0
$pendentes = 0

foreach ($ficheiro in (Get-ChildItem -Path $Root -Recurse -Filter *.html -File)) {
    $html = Get-Content -LiteralPath $ficheiro.FullName -Raw -Encoding UTF8

    if ($html.IndexOf($marcador) -lt 0) { continue }

    if ($Check) {
        $pendentes++
        Write-Output ("PENDENTE (marcador por resolver): " + $ficheiro.FullName.Replace($Root, '.'))
        continue
    }

    # Profundidade relativa à raiz -> prefixo
    $relativo = $ficheiro.FullName.Substring($Root.Length).TrimStart('\')
    $niveis = ($relativo -split '\\').Count - 1
    $prefixo = ''
    if ($niveis -gt 0) { $prefixo = ('../' * $niveis) }

    $rodape = $modelo.Replace('{{P}}', $prefixo)
    $novo = $html.Replace($marcador, $rodape)

    [System.IO.File]::WriteAllText(
        $ficheiro.FullName,
        $novo,
        (New-Object System.Text.UTF8Encoding($false))
    )

    $alterados++
    Write-Output ("Rodapé injetado (prefixo '$prefixo'): " + $ficheiro.FullName.Replace($Root, '.'))
}

Write-Output ''
if ($Check) {
    Write-Output ("Páginas com o marcador por resolver: " + $pendentes)
    if ($pendentes -gt 0) { exit 1 }
    exit 0
}

Write-Output ("Páginas atualizadas: " + $alterados)
