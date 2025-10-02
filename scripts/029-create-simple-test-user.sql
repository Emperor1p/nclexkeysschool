-- Create Simple Test User
-- This script creates a basic test user without complex RLS

-- Step 1: Disable RLS on users table
SELECT 'Step 1: Disabling RLS on users table' as info;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Create a simple test user in auth.users
SELECT 'Step 2: Creating test user in auth.users' as info;

DO $$
DECLARE
  test_user_id UUID;
BEGIN
  -- Delete existing test user
  DELETE FROM auth.users WHERE email = 'test@nclexkeys.com';
  DELETE FROM public.users WHERE email = 'test@nclexkeys.com';
  
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
    'test@nclexkeys.com',
    crypt('Test123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    FALSE,
    '',
    ''
  ) RETURNING id INTO test_user_id;
  
  -- Create public user
  INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
  VALUES (
    test_user_id,
    'test@nclexkeys.com',
    'Test User',
    'instructor',
    '+234-000-0000',
    NOW(),
    NOW()
  );
  
  RAISE NOTICE 'Test user created with ID: %', test_user_id;
END $$;

-- Step 3: Verify test user
SELECT 'Step 3: Verifying test user' as info;
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  au.email as auth_email
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'test@nclexkeys.com';

-- Step 4: Test credentials
SELECT 'Step 4: Test credentials' as info;
SELECT 
  'Email: test@nclexkeys.com' as email,
  'Password: Test123' as password,
  'Role: instructor' as role,
  'Try logging in with these credentials!' as action;
