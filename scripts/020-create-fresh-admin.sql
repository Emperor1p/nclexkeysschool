-- Create Fresh Admin Account
-- This script creates a completely new admin account to avoid any schema issues

-- Step 1: Remove existing admin account if it exists
DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';
DELETE FROM auth.users WHERE email = 'admin@nclexkeys.com';

-- Step 2: Create new admin account
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

  -- Display success message
  RAISE NOTICE 'Admin account created successfully with ID: %', admin_id;
END $$;

-- Step 3: Verify the account was created
SELECT 'Admin account created:' as status;
SELECT 
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'instructor' as role,
  'Ready to login!' as message;

-- Step 4: Test query (this should work now)
SELECT 'Testing admin account query:' as status;
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';
