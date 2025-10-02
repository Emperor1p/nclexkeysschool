-- Disable RLS Completely (Last Resort)
-- This script disables RLS on all tables to eliminate authentication issues

-- Step 1: Check current RLS status
SELECT 'Step 1: Current RLS status' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename IN ('users', 'enrollments', 'courses', 'programs', 'enrollment_tokens', 'user_progress')
ORDER BY tablename;

-- Step 2: Disable RLS on all tables
SELECT 'Step 2: Disabling RLS on all tables' as info;

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollment_tokens DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify RLS is disabled
SELECT 'Step 3: Verifying RLS is disabled' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity THEN '❌ RLS Still Enabled'
    ELSE '✅ RLS Disabled'
  END as status
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename IN ('users', 'enrollments', 'courses', 'programs', 'enrollment_tokens', 'user_progress')
ORDER BY tablename;

-- Step 4: Test admin account query
SELECT 'Step 4: Testing admin account query' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 5: Final status
SELECT 'Step 5: Final status' as info;
SELECT 
  '⚠️ RLS DISABLED ON ALL TABLES' as warning,
  'This removes security but should fix login issues' as note,
  'Test admin login now!' as action;
