@echo off
REM Simple Database Backup & Rollback Script for Windows
REM Usage: backup.bat [backup|rollback|status]

set ACTION=%1
if "%ACTION%"=="" set ACTION=help

REM Load .env file
if exist .env (
    for /f "tokens=1,2 delims==" %%a in (.env) do (
        if not "%%a"=="" if not "%%a:~0,1%"=="#" (
            set %%a=%%b
        )
    )
)

set DB_HOST=%DB_HOST%
if "%DB_HOST%"=="" set DB_HOST=127.0.0.1
set DB_PORT=%DB_PORT%
if "%DB_PORT%"=="" set DB_PORT=3306
set DB_DATABASE=%DB_DATABASE%
if "%DB_DATABASE%"=="" set DB_DATABASE=homwork
set DB_USERNAME=%DB_USERNAME%
if "%DB_USERNAME%"=="" set DB_USERNAME=root
set DB_PASSWORD=%DB_PASSWORD%
if "%DB_PASSWORD%"=="" set DB_PASSWORD=

if not exist "database\backups" mkdir "database\backups"

if "%ACTION%"=="backup" goto backup
if "%ACTION%"=="rollback" goto rollback
if "%ACTION%"=="status" goto status
goto help

:backup
set BACKUP_NAME=backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_NAME=%BACKUP_NAME: =0%
echo 💾 Creating backup: %BACKUP_NAME%
C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysqldump.exe -h %DB_HOST% -P %DB_PORT% -u %DB_USERNAME% -p%DB_PASSWORD% --single-transaction --routines --triggers --events --hex-blob %DB_DATABASE% > "database\backups\%BACKUP_NAME%.sql"
echo ✅ Backup saved: database\backups\%BACKUP_NAME%.sql
goto end

:rollback
echo 📋 Available backups:
dir /b /o-d "database\backups\*.sql" 2>nul | findstr /n ".*"
set /p num="Enter backup number: "
for /f "tokens=1* delims=:" %%a in ('dir /b /o-d "database\backups\*.sql" 2^>nul ^| findstr /n ".*" ^| findstr "^%num%:"') do set BACKUP_FILE=%%b
if exist "database\backups\%BACKUP_FILE%" (
    echo ⚠️  Restoring: %BACKUP_FILE%
    set /p confirm=Continue? (y/n): 
    if /i "%confirm%"=="y" (
        C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe -h %DB_HOST% -P %DB_PORT% -u %DB_USERNAME% -p%DB_PASSWORD% -e "DROP DATABASE IF EXISTS %DB_DATABASE%; CREATE DATABASE %DB_DATABASE%;"
        C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe -h %DB_HOST% -P %DB_PORT% -u %DB_USERNAME% -p%DB_PASSWORD% %DB_DATABASE% < "database\backups\%BACKUP_FILE%"
        echo ✅ Database restored
    )
) else (
    echo ❌ Invalid backup number
)
goto end

:status
echo 📊 Database: %DB_DATABASE%@%DB_HOST%:%DB_PORT%
C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe -h %DB_HOST% -P %DB_PORT% -u %DB_USERNAME% -p%DB_PASSWORD% -e "SELECT 1;" >nul 2>&1
if %errorlevel%==0 (
    echo ✅ Connection OK
) else (
    echo ❌ Connection failed
)
for /f %%i in ('dir /b "database\backups\*.sql" 2^>nul ^| find /c /v ""') do echo 💾 Backups: %%i files
goto end

:help
echo 🎯 Simple Database Manager
echo Usage: backup.bat [backup^|rollback^|status]
echo.
echo Commands:
echo   backup   - Create database backup
echo   rollback - Restore from backup
echo   status   - Check connection ^& backups
echo   help     - Show this help

:end
