-- Recreate Admin Completely
-- This script completely removes existing admin and creates a fresh one

-- Step 1: Show what exists before deletion
SELECT 'Step 1: Current admin records' as info;
SELECT 
  'Auth users:' as label,
  COUNT(*) as count
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  'Public users:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 2: Delete existing admin completely
SELECT 'Step 2: Deleting existing admin' as info;
DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';
DELETE FROM auth.users WHERE email = 'admin@nclexkeys.com';

-- Step 3: Verify deletion
SELECT 'Step 3: Verifying deletion' as info;
SELECT 
  'Auth users after deletion:' as label,
  COUNT(*) as count
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  'Public users after deletion:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 4: Create fresh admin account
SELECT 'Step 4: Creating fresh admin account' as info;

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
  ) RETURNING id INTO admin_id;
  
  -- Create public user
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
  
  RAISE NOTICE 'Fresh admin account created with ID: %', admin_id;
END $$;

-- Step 5: Verify the new admin account
SELECT 'Step 5: Verifying new admin account' as info;
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

-- Step 6: Final status
SELECT 'Step 6: Final status' as info;
SELECT 
  '✅ Fresh admin account created successfully!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Try logging in now!' as action;
