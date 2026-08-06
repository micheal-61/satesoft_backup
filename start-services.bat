@echo off
title Satesoft Services Startup
color 0A

echo ============================================
echo   Satesoft - Starting Required Services
echo ============================================
echo.

:: Check if MySQL is already running on port 3306
"C:\xampp\mysql\bin\mysql.exe" -u satesoft_user -psatesoft_pass -h 127.0.0.1 -P 3306 -e "SELECT 1" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MySQL is already running.
    goto start_express
)

echo [1/2] Starting MySQL Server (MariaDB 10.4.32)...
start "MySQL Server" "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\My.ini" --standalone

:wait_mysql
timeout /t 2 /nobreak >nul
"C:\xampp\mysql\bin\mysql.exe" -u satesoft_user -psatesoft_pass -h 127.0.0.1 -P 3306 -e "SELECT 1" >nul 2>&1
if %errorlevel% neq 0 goto wait_mysql

echo [OK] MySQL is running on port 3306.

:start_express
echo.

:: Check if Express server is already running on port 3001
netstat -ano | findstr ":3001" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Express server is already running on port 3001.
    goto start_vite
)

echo [2/3] Starting Express Server (API)...
start "Express Server" cmd /k "cd /d "%~dp0" && node server.js"

:wait_express
timeout /t 2 /nobreak >nul
curl -s "http://localhost:3001/api/health" >nul 2>&1
if %errorlevel% neq 0 goto wait_express

echo [OK] Express server is running on port 3001.

:start_vite
echo.

:: Check if Vite dev server is already running on port 5173
netstat -ano | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Vite dev server is already running on port 5173.
    goto done
)

echo [3/3] Starting Vite Dev Server (Frontend)...
start "Vite Dev Server" cmd /k "cd /d "%~dp0" && npm run dev"

:wait_vite
timeout /t 3 /nobreak >nul
curl -s "http://localhost:5173" >nul 2>&1
if %errorlevel% neq 0 goto wait_vite

echo [OK] Vite dev server is running on port 5173.

:done
echo.
echo ============================================
echo   All services started successfully!
echo ============================================
echo.
echo   MySQL:     http://localhost:3306 (MariaDB)
echo   API:       http://localhost:3001
echo   Frontend:  http://localhost:5173
echo.
echo   Login:     username: admin   password: admin
echo.
pause
