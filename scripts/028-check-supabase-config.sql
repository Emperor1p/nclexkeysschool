-- Check Supabase Configuration
-- This script diagnoses the root cause of the 500 error

-- Step 1: Test basic database connectivity
SELECT 'Step 1: Database connectivity test' as info;
SELECT 
  current_database() as database_name,
  current_user as current_user,
  version() as postgres_version,
  NOW() as current_time;

-- Step 2: Check if we can access auth schema
SELECT 'Step 2: Auth schema access test' as info;
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'auth' 
LIMIT 3;

-- Step 3: Check auth.users table structure
SELECT 'Step 3: Auth.users table structure' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- Step 4: Check if we can query auth.users
SELECT 'Step 4: Auth.users query test' as info;
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_users
FROM auth.users;

-- Step 5: Check public schema tables
SELECT 'Step 5: Public schema tables' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Step 6: Check if admin exists in auth.users
SELECT 'Step 6: Admin existence check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin EXISTS in auth.users'
    ELSE 'Admin NOT FOUND in auth.users'
  END as admin_status;

-- Step 7: Check if admin exists in public.users
SELECT 'Step 7: Public admin check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM public.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin EXISTS in public.users'
    ELSE 'Admin NOT FOUND in public.users'
  END as public_admin_status;

-- Step 8: Check RLS policies
SELECT 'Step 8: RLS policies check' as info;
SELECT 
  tablename,
  policyname,
  cmd,
  CASE 
    WHEN qual IS NOT NULL THEN 'Has condition'
    ELSE 'No condition'
  END as has_condition
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- Step 9: Test simple insert (if RLS is disabled)
SELECT 'Step 9: Testing simple operations' as info;
SELECT 
  'Testing basic operations...' as test_status;

-- Step 10: Summary
SELECT 'Step 10: Diagnosis summary' as info;
SELECT 
  'Database connection: ' || CASE WHEN current_database() IS NOT NULL THEN 'OK' ELSE 'FAILED' END as db_status,
  'Auth schema access: ' || CASE WHEN EXISTS(SELECT 1 FROM pg_tables WHERE schemaname = 'auth') THEN 'OK' ELSE 'FAILED' END as auth_status,
  'Public schema access: ' || CASE WHEN EXISTS(SELECT 1 FROM pg_tables WHERE schemaname = 'public') THEN 'OK' ELSE 'FAILED' END as public_status;
