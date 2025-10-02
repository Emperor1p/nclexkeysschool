-- Test Supabase Connection and Configuration
-- This script tests basic Supabase functionality

-- Step 1: Test basic database connection
SELECT 'Step 1: Testing database connection' as info;
SELECT NOW() as current_time, 'Database connection working!' as status;

-- Step 2: Test auth schema access
SELECT 'Step 2: Testing auth schema access' as info;
SELECT 
  COUNT(*) as total_users,
  'Auth schema accessible!' as status
FROM auth.users;

-- Step 3: Test public schema access
SELECT 'Step 3: Testing public schema access' as info;
SELECT 
  COUNT(*) as total_users,
  'Public schema accessible!' as status
FROM public.users;

-- Step 4: Test RLS status
SELECT 'Step 4: Checking RLS status' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity THEN 'RLS Enabled'
    ELSE 'RLS Disabled'
  END as status
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

-- Step 5: Test admin account existence
SELECT 'Step 5: Checking admin account' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin exists in auth.users'
    ELSE 'Admin NOT found in auth.users'
  END as auth_status;

SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@nclexkeys.com') 
    THEN 'Admin exists in public.users'
    ELSE 'Admin NOT found in public.users'
  END as public_status;

-- Step 6: Test RLS policies
SELECT 'Step 6: Checking RLS policies' as info;
SELECT 
  policyname,
  cmd,
  CASE 
    WHEN qual IS NOT NULL THEN 'Has SELECT condition'
    ELSE 'No SELECT condition'
  END as select_condition
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

-- Step 7: Summary
SELECT 'Step 7: Summary' as info;
SELECT 
  'Supabase connection test completed!' as status,
  'Check the results above for any issues' as note;
