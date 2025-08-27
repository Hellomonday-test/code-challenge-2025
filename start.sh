#!/bin/bash

# Start script for Code Test Application
echo "Starting Code Test Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Function to install dependencies if node_modules doesn't exist
install_if_needed() {
    local dir=$1
    if [ ! -d "$dir/node_modules" ]; then
        echo "Installing dependencies in $dir..."
        (cd "$dir" && npm install)
    else
        echo "Dependencies already installed in $dir"
    fi
}

# Install backend dependencies
install_if_needed "./backend"

# Install frontend dependencies  
install_if_needed "./frontend"

echo ""
echo "Starting backend server..."
(cd backend && npm start) &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend application..."
(cd frontend && npm start) &
FRONTEND_PID=$!

echo ""
echo "Applications started!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both applications"

# Wait for user to stop the script
trap 'echo "Stopping applications..."; kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait