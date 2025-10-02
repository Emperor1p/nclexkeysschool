-- Fix Admin Login Issues
-- This script addresses the "Database error querying schema" issue

-- Step 1: Check current admin account status
SELECT 'Step 1: Checking admin account status' as info;

-- Check auth.users
SELECT 'Admin in auth.users:' as status;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

-- Check public.users
SELECT 'Admin in public.users:' as status;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 2: Create missing public.users record if needed
SELECT 'Step 2: Creating missing public.users record' as info;

-- Insert admin user into public.users if it doesn't exist
INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
SELECT 
  a.id,
  a.email,
  'NCLEX Keys Admin',
  'instructor',
  '+234-000-0000',
  NOW(),
  NOW()
FROM auth.users a
WHERE a.email = 'admin@nclexkeys.com'
AND NOT EXISTS (
  SELECT 1 FROM public.users p WHERE p.id = a.id
);

-- Step 3: Fix RLS policies for users table
SELECT 'Step 3: Fixing RLS policies' as info;

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Create comprehensive RLS policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow instructors to view all users (for admin purposes)
CREATE POLICY "Instructors can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'instructor'
    )
  );

-- Step 4: Ensure RLS is properly enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 5: Verify the fix
SELECT 'Step 5: Verification' as info;

-- Check if admin can now be queried
SELECT 'Admin account verification:' as status;
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  u.created_at,
  'Admin account is ready!' as status
FROM public.users u
WHERE u.email = 'admin@nclexkeys.com';

-- Check RLS policies
SELECT 'RLS policies created:' as status;
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

SELECT '✅ Admin login issues should now be fixed!' as result;
