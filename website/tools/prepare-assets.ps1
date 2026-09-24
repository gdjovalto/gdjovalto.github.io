<#
    prepare-assets.ps1
    Prepara os ativos do sítio do Grupo Desportivo Jovalto em assets/img.

    Usa apenas PowerShell + WPF/WIC (bibliotecas de imagem do Windows).
    Não requer node, python, git, ImageMagick nem qualquer instalação.

    Uso:
        powershell -ExecutionPolicy Bypass -File tools\prepare-assets.ps1
#>
[CmdletBinding()]
param(
    [string]$Root
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore

# Determina a raiz do projeto (a pasta acima de tools\).
# Nota: $PSScriptRoot não é fiável em valores por omissão de parâmetros no
# Windows PowerShell 5.1, pelo que a resolução é feita no corpo do script.
if ([string]::IsNullOrWhiteSpace($Root)) {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $Root = Split-Path -Parent $scriptDir
}
$Root = (Resolve-Path -LiteralPath $Root).Path
Write-Verbose "Raiz do projeto: $Root"

$logosDir = Join-Path $Root 'Logos'
$imgDir   = Join-Path $Root 'assets\img'

# A fotografia da equipa pode chegar em vários formatos (o clube já a forneceu
# em .avif e em .jpg). Procura-se pela ordem indicada, para o script continuar
# a funcionar quando o ficheiro de origem é substituído.
$photoCandidates = @('foto_plantel.jpg', 'foto_plantel.jpeg', 'foto_plantel.png', 'foto_plantel.avif')
$photoSrc = $null
foreach ($cand in $photoCandidates) {
    $p = Join-Path $Root $cand
    if (Test-Path -LiteralPath $p) { $photoSrc = $p; break }
}

if (-not (Test-Path -LiteralPath $imgDir)) {
    New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
}

function Get-Image {
    param([Parameter(Mandatory)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) { throw "Ficheiro não encontrado: $Path" }
    $bmp = New-Object System.Windows.Media.Imaging.BitmapImage
    $bmp.BeginInit()
    $bmp.UriSource = (New-Object System.Uri($Path))
    $bmp.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
    $bmp.EndInit()
    return $bmp
}

function Save-Encoded {
    param(
        [Parameter(Mandatory)]$Source,
        [Parameter(Mandatory)][string]$Destination,
        [ValidateSet('Jpeg','Png')][string]$Format = 'Png',
        [int]$Quality = 88
    )
    if ($Format -eq 'Jpeg') {
        $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
        $encoder.QualityLevel = $Quality
    } else {
        $encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    }
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($Source))
    $stream = [System.IO.File]::Open($Destination, [System.IO.FileMode]::Create)
    try { $encoder.Save($stream) } finally { $stream.Dispose() }
}

function Resize-Image {
    param(
        [Parameter(Mandatory)]$Source,
        [Parameter(Mandatory)][int]$Width
    )
    $scale = $Width / $Source.PixelWidth
    $transform = New-Object System.Windows.Media.ScaleTransform($scale, $scale)
    # Preserva o canal alfa do emblema oficial
    return New-Object System.Windows.Media.Imaging.TransformedBitmap($Source, $transform)
}

$results = New-Object System.Collections.Generic.List[object]

# --- 1) Emblema: cópias com nomes estáveis -------------------------------------
$copies = @(
    [pscustomobject]@{ From = 'logo_actual.png';            To = 'emblema-oficial.png' },
    [pscustomobject]@{ From = 'logo_digitalizado.png';      To = 'emblema-digitalizado.png' },
    [pscustomobject]@{ From = 'logo_original.jpg';          To = 'emblema-original.jpg' },
    [pscustomobject]@{ From = 'Criterios_reconstrucao.png'; To = 'criterios-reconstrucao.png' }
)
foreach ($item in $copies) {
    $from = Join-Path $logosDir $item.From
    $to   = Join-Path $imgDir $item.To
    if (-not (Test-Path -LiteralPath $from)) {
        Write-Warning "Ignorado (não existe): $from"
        continue
    }
    Copy-Item -LiteralPath $from -Destination $to -Force
    $results.Add([pscustomobject]@{
        Destino  = $item.To
        Operacao = 'cópia'
        Bytes    = (Get-Item -LiteralPath $to).Length
    })
}

# --- 2) Fotografia da equipa: qualquer formato -> JPEG -------------------------
$photoDest = Join-Path $imgDir 'foto-equipa-bicampeonato.jpg'
if ($photoSrc) {
    $photo = Get-Image -Path $photoSrc
    Save-Encoded -Source $photo -Destination $photoDest -Format Jpeg -Quality 88
    $ext = ([System.IO.Path]::GetExtension($photoSrc)).TrimStart('.').ToUpper()
    $results.Add([pscustomobject]@{
        Destino  = 'foto-equipa-bicampeonato.jpg'
        Operacao = "$ext->JPEG $($photo.PixelWidth)x$($photo.PixelHeight)"
        Bytes    = (Get-Item -LiteralPath $photoDest).Length
    })
} else {
    Write-Warning ("Fotografia não encontrada. Formatos procurados: " + ($photoCandidates -join ', '))
}

# --- 3) Favicon PNG a partir do emblema oficial -------------------------------
$emblemaSrc  = Join-Path $logosDir 'logo_actual.png'
$faviconDest = Join-Path $imgDir 'favicon.png'
if (Test-Path -LiteralPath $emblemaSrc) {
    $emblema = Get-Image -Path $emblemaSrc
    $small   = Resize-Image -Source $emblema -Width 64
    Save-Encoded -Source $small -Destination $faviconDest -Format Png
    $results.Add([pscustomobject]@{
        Destino  = 'favicon.png'
        Operacao = 'redimensionado para 64px de largura'
        Bytes    = (Get-Item -LiteralPath $faviconDest).Length
    })
} else {
    Write-Warning "Emblema oficial não encontrado: $emblemaSrc"
}

Write-Output ''
Write-Output 'Ativos preparados em assets/img:'
$results | Format-Table -AutoSize | Out-String -Width 140 | Write-Output
Write-Output ('Total de ficheiros: ' + $results.Count)
