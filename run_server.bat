@echo off
title GunjanCore Local Server
echo Starting GunjanCore Local Server on http://localhost:8080 ...
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8080
pause
