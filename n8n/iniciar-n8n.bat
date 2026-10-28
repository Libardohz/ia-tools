@echo off
title n8n - Automatizador Local
echo ========================================================
echo Iniciando n8n (Flujos de Trabajo e Integraciones con IA)
echo Panel Web: http://localhost:5678
echo Presiona Ctrl+C en esta ventana para detener el servidor
echo ========================================================

set N8N_USER_FOLDER=%~dp0.n8n_data
if not exist "%N8N_USER_FOLDER%" mkdir "%N8N_USER_FOLDER%"

npx n8n
pause

