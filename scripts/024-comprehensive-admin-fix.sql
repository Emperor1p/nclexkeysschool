-- Comprehensive Admin Fix
-- This script completely rebuilds the admin account and fixes all issues

-- Step 1: Complete cleanup of existing admin account
SELECT 'Step 1: Cleaning up existing admin account' as info;

-- Delete from public.users first (due to foreign key constraint)
DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';

-- Delete from auth.users
DELETE FROM auth.users WHERE email = 'admin@nclexkeys.com';

-- Step 2: Disable RLS temporarily for clean setup
SELECT 'Step 2: Temporarily disabling RLS' as info;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 3: Create fresh admin account
SELECT 'Step 3: Creating fresh admin account' as info;

DO $$
DECLARE
  admin_id UUID;
BEGIN
  -- Create auth user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@nclexkeys.com',
    crypt('Admin2025', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    '',
    ''
  )
  RETURNING id INTO admin_id;

  -- Create user profile
  INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
  VALUES (
    admin_id,
    'admin@nclexkeys.com',
    'NCLEX Keys Admin',
    'instructor',
    '+234-000-0000',
    NOW(),
    NOW()
  );

  RAISE NOTICE 'Admin account created successfully with ID: %', admin_id;
END $$;

-- Step 4: Test the account without RLS
SELECT 'Step 4: Testing admin account without RLS' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 5: Re-enable RLS with proper policies
SELECT 'Step 5: Re-enabling RLS with proper policies' as info;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Instructors can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;

-- Create simple, working policies
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

-- Allow instructors to view all users
CREATE POLICY "Instructors can view all users" ON public.users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE public.users.id = auth.uid()
      AND public.users.role = 'instructor'
    )
  );

-- Step 6: Test with RLS enabled
SELECT 'Step 6: Testing with RLS enabled' as info;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 7: Show final status
SELECT 'Step 7: Final status' as info;
SELECT 
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'instructor' as role,
  'Account rebuilt and ready!' as status;

SELECT '✅ Admin account completely rebuilt and ready to use!' as result;
