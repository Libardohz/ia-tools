Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Iniciando n8n (Flujos de Trabajo e Integraciones con IA)" -ForegroundColor Green
Write-Host "Panel Web: http://localhost:5678" -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host "========================================================" -ForegroundColor Cyan

$dataFolder = Join-Path $PSScriptRoot ".n8n_data"
if (-not (Test-Path $dataFolder)) {
    New-Item -ItemType Directory -Path $dataFolder | Out-Null
}

$env:N8N_USER_FOLDER = $dataFolder
npx n8n

