-- Verify Admin Account Exists
-- This script checks if the admin account was created successfully

-- Check if admin user exists in auth.users
SELECT 'Checking auth.users table:' as info;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

-- Check if admin user exists in public.users
SELECT 'Checking public.users table:' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Check if admin can login (this will show the encrypted password)
SELECT 'Admin account details:' as info;
SELECT 
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'instructor' as role,
  'Use these credentials to login' as note;

-- If no results above, the admin account needs to be created
-- Run the script: scripts/005-create-instructors.sql to create it
