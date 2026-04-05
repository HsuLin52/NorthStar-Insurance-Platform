#!/bin/bash

echo "=========================================="
echo "Insurance Platform - Database Seeding"
echo "=========================================="

echo ""

# Navigate to backend
cd backend-api || {
    echo "backend-api folder not found"
    exit 1
}

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Step 1: Seeding Roles..."
node src/seed/roles.seed.js

if [ $? -ne 0 ]; then
    echo "Roles seeding failed"
    exit 1
fi

echo ""
echo "Step 2: Seeding Users..."
node src/seed/users.seed.js

if [ $? -ne 0 ]; then
    echo "Users seeding failed"
    exit 1
fi

echo ""
echo "=========================================="
echo "Seeding completed successfully"
echo "=========================================="

read -p "Press Enter to continue..."