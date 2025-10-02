#!/bin/bash

# NCLEX Keys Admin Setup Script
# This script safely creates/updates the admin user using Supabase Admin API

echo "🚀 NCLEX Keys Admin Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Supabase credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=https://bpyqsxwbxsfozdzustgy.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key"
    echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
    echo ""
    exit 1
fi

echo "✅ Environment file found"
echo "✅ Node.js is available"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the admin setup
echo "🔧 Running admin setup..."
node scripts/run-admin-setup.js

echo ""
echo "🎉 Admin setup completed!"
echo "You can now login with admin@nclexkeys.com / Admin2025"
