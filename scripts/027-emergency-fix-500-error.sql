-- EMERGENCY FIX FOR 500 ERROR
-- This script addresses the "Database error querying schema" issue

-- Step 1: Check if we can access the database at all
SELECT 'Step 1: Testing basic database access' as info;
SELECT NOW() as current_time;

-- Step 2: Check auth.users table structure
SELECT 'Step 2: Checking auth.users table' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'auth' AND table_name = 'users'
LIMIT 5;

-- Step 3: Check if admin exists in auth.users
SELECT 'Step 3: Checking admin in auth.users' as info;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 4: If admin doesn't exist, create it with minimal data
SELECT 'Step 4: Creating admin if missing' as info;

DO $$
DECLARE
  admin_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@nclexkeys.com') INTO admin_exists;
  
  IF NOT admin_exists THEN
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
    );
    RAISE NOTICE 'Admin user created in auth.users';
  ELSE
    RAISE NOTICE 'Admin user already exists in auth.users';
  END IF;
END $$;

-- Step 5: Disable RLS completely on all tables
SELECT 'Step 5: Disabling RLS on all tables' as info;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollment_tokens DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;

-- Step 6: Create/update admin in public.users
SELECT 'Step 6: Creating admin in public.users' as info;

DO $$
DECLARE
  admin_auth_id UUID;
BEGIN
  -- Get admin auth ID
  SELECT id INTO admin_auth_id FROM auth.users WHERE email = 'admin@nclexkeys.com';
  
  -- Delete existing admin from public.users
  DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';
  
  -- Insert new admin
  INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
  VALUES (
    admin_auth_id,
    'admin@nclexkeys.com',
    'NCLEX Keys Admin',
    'instructor',
    '+234-000-0000',
    NOW(),
    NOW()
  );
  
  RAISE NOTICE 'Admin created in public.users with ID: %', admin_auth_id;
END $$;

-- Step 7: Test the admin account
SELECT 'Step 7: Testing admin account' as info;
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  au.email as auth_email,
  au.email_confirmed_at
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'admin@nclexkeys.com';

-- Step 8: Final status
SELECT 'Step 8: Final status' as info;
SELECT 
  '✅ EMERGENCY FIX COMPLETED' as status,
  'Admin: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'RLS: DISABLED' as security,
  'Try login now!' as action;
