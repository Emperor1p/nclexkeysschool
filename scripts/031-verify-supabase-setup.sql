-- Verify Supabase Setup
-- This script checks if your Supabase project is properly configured

-- Test 1: Basic database access
SELECT 'Test 1: Database Access' as test_name;
SELECT 
  current_database() as database_name,
  current_user as current_user,
  NOW() as current_time;

-- Test 2: Auth schema access
SELECT 'Test 2: Auth Schema Access' as test_name;
SELECT 
  COUNT(*) as auth_users_count
FROM auth.users;

-- Test 3: Public schema access
SELECT 'Test 3: Public Schema Access' as test_name;
SELECT 
  COUNT(*) as public_users_count
FROM public.users;

-- Test 4: Check if admin exists
SELECT 'Test 4: Admin Account Check' as test_name;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin EXISTS in auth.users'
    ELSE 'Admin NOT FOUND in auth.users'
  END as admin_auth_status;

SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM public.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin EXISTS in public.users'
    ELSE 'Admin NOT FOUND in public.users'
  END as admin_public_status;

-- Test 5: RLS status
SELECT 'Test 5: RLS Status' as test_name;
SELECT 
  tablename,
  CASE 
    WHEN rowsecurity THEN 'RLS ENABLED'
    ELSE 'RLS DISABLED'
  END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'users';

-- Test 6: Summary
SELECT 'Test 6: Summary' as test_name;
SELECT 
  'If you see this message, your Supabase project is accessible' as status,
  'Run the final admin fix script if admin is missing' as next_step;
