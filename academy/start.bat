@echo off
rem Data Academy launcher — double-click to start the local server and open the browser.
cd /d "%~dp0"
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:8080'"
echo Starting Data Academy at http://localhost:8080
echo Press Ctrl+C to stop the server.
node server.js
pause
