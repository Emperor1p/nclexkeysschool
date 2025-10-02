-- Temporarily Disable RLS for Testing
-- This script disables RLS to test if that's causing the login issues

-- Step 1: Check current RLS status
SELECT 'Step 1: Checking RLS status' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

-- Step 2: Temporarily disable RLS
SELECT 'Step 2: Disabling RLS temporarily' as info;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 3: Test admin account query (should work now)
SELECT 'Step 3: Testing admin account query' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 4: Show current RLS status
SELECT 'Step 4: Current RLS status' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

SELECT '⚠️ RLS temporarily disabled. Test admin login now!' as result;
SELECT '⚠️ Remember to re-enable RLS after testing!' as warning;
