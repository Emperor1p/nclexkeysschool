# 🔧 Safe Admin Setup Guide

This guide shows you how to safely create and manage admin users using the Supabase Admin API instead of direct database edits.

## 🚀 Quick Start

### Option 1: Using npm script (Recommended)
```bash
npm run setup-admin
```

### Option 2: Using batch file (Windows)
```bash
scripts/setup-admin.bat
```

### Option 3: Using shell script (Mac/Linux)
```bash
chmod +x scripts/setup-admin.sh
./scripts/setup-admin.sh
```

### Option 4: Direct execution
```bash
node scripts/run-admin-setup.js
```

## 📋 Prerequisites

1. **Environment Variables**: Make sure your `.env.local` file exists with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bpyqsxwbxsfozdzustgy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Node.js**: Ensure Node.js is installed
3. **Internet Connection**: Required for Supabase API calls

## 🔧 What the Script Does

### ✅ Safe Operations:
- **Checks existing admin status** in both `auth.users` and `public.users`
- **Creates or updates auth user** with proper password and email confirmation
- **Creates or updates public user** with correct role and metadata
- **Tests login functionality** to ensure everything works
- **No direct database edits** - uses Supabase Admin API only

### 🛡️ Safety Features:
- **No duplicate key errors** - handles existing users gracefully
- **Proper error handling** - clear error messages and troubleshooting
- **Rollback capability** - can delete and recreate if needed
- **Status checking** - shows current state before making changes

## 📊 Admin Credentials

After successful setup:
- **Email**: `admin@nclexkeys.com`
- **Password**: `Admin2025`
- **Role**: `instructor`

## 🔍 Troubleshooting

### Common Issues:

1. **"Failed to fetch" error**:
   - Check your `.env.local` file exists
   - Verify Supabase keys are correct
   - Check internet connection

2. **"Service role key required" error**:
   - Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
   - Get the key from your Supabase dashboard

3. **"User already exists" error**:
   - The script handles this automatically
   - It will update existing users instead of creating duplicates

### Debug Steps:

1. **Check environment variables**:
   ```bash
   node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
   ```

2. **Test Supabase connection**:
   ```bash
   node -e "const { createClient } = require('@supabase/supabase-js'); console.log('Supabase client created successfully')"
   ```

3. **Run with verbose logging**:
   ```bash
   DEBUG=* npm run setup-admin
   ```

## 🔄 Advanced Usage

### Check Admin Status Only:
```javascript
const { checkAdminExists } = require('./scripts/admin-api-manager');
checkAdminExists();
```

### Delete Admin User:
```javascript
const { deleteAdmin } = require('./scripts/admin-api-manager');
deleteAdmin();
```

### Test Admin Login:
```javascript
const { testAdminLogin } = require('./scripts/admin-api-manager');
testAdminLogin();
```

## 📁 File Structure

```
scripts/
├── admin-api-manager.js      # Main API manager
├── run-admin-setup.js        # Simple setup runner
├── setup-admin.bat          # Windows batch file
├── setup-admin.sh           # Unix shell script
└── README-ADMIN-SETUP.md    # This guide
```

## 🎯 Benefits of This Approach

1. **✅ Safe**: Uses official Supabase Admin API
2. **✅ Reliable**: Handles edge cases and errors gracefully
3. **✅ Maintainable**: Easy to understand and modify
4. **✅ Testable**: Can verify results before and after
5. **✅ Reversible**: Can delete and recreate if needed

## 🚨 Important Notes

- **Never commit** `.env.local` to version control
- **Keep service role key secure** - it has full database access
- **Test in development** before using in production
- **Backup your data** before making major changes

## 🆘 Support

If you encounter issues:

1. **Check the console output** for specific error messages
2. **Verify your Supabase project** is active and not paused
3. **Test your internet connection** to Supabase
4. **Check Supabase dashboard** for any project issues

The script provides detailed logging to help diagnose any problems! 🚀
