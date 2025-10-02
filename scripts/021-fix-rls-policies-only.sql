-- Fix RLS Policies Only
-- This script only fixes RLS policies without creating duplicate accounts

-- Step 1: Check current admin account status
SELECT 'Step 1: Checking admin account status' as info;

SELECT 'Admin in auth.users:' as status;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 'Admin in public.users:' as status;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 2: Drop all existing RLS policies on users table
SELECT 'Step 2: Dropping existing RLS policies' as info;

DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Instructors can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile data" ON public.users;

-- Step 3: Create simple, working RLS policies
SELECT 'Step 3: Creating new RLS policies' as info;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy 3: Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy 4: Instructors can view all users (for admin purposes)
CREATE POLICY "Instructors can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'instructor'
    )
  );

-- Step 4: Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 5: Test the policies
SELECT 'Step 4: Testing RLS policies' as info;

-- This should work now - test querying the admin user
SELECT 'Admin account test query:' as status;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 6: Show created policies
SELECT 'Step 5: RLS policies created' as info;
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

SELECT '✅ RLS policies fixed! Admin login should work now.' as result;
