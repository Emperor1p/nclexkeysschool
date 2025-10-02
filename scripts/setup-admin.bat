@echo off
REM NCLEX Keys Admin Setup Script for Windows
REM This script safely creates/updates the admin user using Supabase Admin API

echo 🚀 NCLEX Keys Admin Setup
echo ==========================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local file not found!
    echo Please create .env.local with your Supabase credentials:
    echo.
    echo NEXT_PUBLIC_SUPABASE_URL=https://bpyqsxwbxsfozdzustgy.supabase.co
    echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    echo SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    echo.
    pause
    exit /b 1
)

echo ✅ Environment file found
echo ✅ Node.js is available
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Run the admin setup
echo 🔧 Running admin setup...
node scripts/run-admin-setup.js

echo.
echo 🎉 Admin setup completed!
echo You can now login with admin@nclexkeys.com / Admin2025
pause
