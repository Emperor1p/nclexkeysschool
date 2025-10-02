-- Re-enable RLS with Fixed Policies
-- This script re-enables RLS with the correct policies

-- Step 1: Re-enable RLS
SELECT 'Step 1: Re-enabling RLS' as info;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 2: Create proper RLS policies
SELECT 'Step 2: Creating proper RLS policies' as info;

-- Drop any existing policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Instructors can view all users" ON public.users;

-- Create working policies
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

CREATE POLICY "Instructors can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'instructor'
    )
  );

-- Step 3: Test the policies
SELECT 'Step 3: Testing RLS policies' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 4: Show final status
SELECT 'Step 4: Final RLS status' as info;
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

SELECT '✅ RLS re-enabled with proper policies!' as result;
