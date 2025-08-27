@echo off
echo Starting Code Test Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    npm install
    cd ..
) else (
    echo Backend dependencies already installed
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
) else (
    echo Frontend dependencies already installed
)

echo.
echo Starting backend server...
start /b cmd /c "cd backend && npm start"

echo Waiting for backend to start...
timeout /t 3 >nul

echo Starting frontend application...
start /b cmd /c "cd frontend && npm start"

echo.
echo Applications started!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop applications...
pause >nul