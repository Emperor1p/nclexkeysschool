-- Fix Duplicate Admin Error
-- This script handles the case where admin exists but has duplicate key issues

-- Step 1: Check current admin status
SELECT 'Step 1: Checking current admin status' as info;
SELECT 
  'Auth users count:' as label,
  COUNT(*) as count
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  'Public users count:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 2: Show existing admin records
SELECT 'Step 2: Existing admin records' as info;
SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  id,
  email,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 3: Clean up existing admin completely
SELECT 'Step 3: Cleaning up existing admin' as info;
DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';
DELETE FROM auth.users WHERE email = 'admin@nclexkeys.com';

-- Step 4: Verify cleanup
SELECT 'Step 4: Verifying cleanup' as info;
SELECT 
  'Auth users after cleanup:' as label,
  COUNT(*) as count
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  'Public users after cleanup:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 5: Create fresh admin account
SELECT 'Step 5: Creating fresh admin account' as info;

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
  
  -- Create public user with the same ID
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
  
  RAISE NOTICE 'Fresh admin account created successfully with ID: %', admin_id;
END $$;

-- Step 6: Verify the new admin account
SELECT 'Step 6: Verifying new admin account' as info;
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

-- Step 7: Final status
SELECT 'Step 7: Final status' as info;
SELECT 
  '✅ Admin account fixed and ready!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Try logging in now!' as action;
