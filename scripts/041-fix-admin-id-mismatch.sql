-- Fix Admin ID Mismatch
-- This script handles the case where admin exists but has ID mismatches

-- Step 1: Check existing admin records in both tables
SELECT 'Step 1: Checking existing admin records' as info;
SELECT 
  'Auth users with admin email:' as label,
  COUNT(*) as count
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  'Public users with admin email:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 2: Show existing admin details
SELECT 'Step 2: Existing admin details' as info;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 3: Check if the IDs match
SELECT 'Step 3: Checking ID matching' as info;
SELECT 
  au.id as auth_id,
  pu.id as public_id,
  CASE 
    WHEN au.id = pu.id THEN 'IDs MATCH'
    ELSE 'IDs DO NOT MATCH'
  END as id_status
FROM auth.users au
FULL OUTER JOIN public.users pu ON au.email = pu.email
WHERE au.email = 'admin@nclexkeys.com' OR pu.email = 'admin@nclexkeys.com';

-- Step 4: Fix the mismatch by updating the existing records
SELECT 'Step 4: Fixing admin records' as info;

DO $$
DECLARE
  auth_admin_id UUID;
  public_admin_id UUID;
BEGIN
  -- Get the auth user ID
  SELECT id INTO auth_admin_id FROM auth.users WHERE email = 'admin@nclexkeys.com';
  
  -- Get the public user ID
  SELECT id INTO public_admin_id FROM public.users WHERE email = 'admin@nclexkeys.com';
  
  IF auth_admin_id IS NOT NULL AND public_admin_id IS NOT NULL THEN
    -- Both exist, update the public user to match auth user
    UPDATE public.users 
    SET 
      id = auth_admin_id,
      role = 'instructor',
      full_name = 'NCLEX Keys Admin',
      phone_number = '+234-000-0000',
      updated_at = NOW()
    WHERE email = 'admin@nclexkeys.com';
    
    RAISE NOTICE 'Updated public user to match auth user ID: %', auth_admin_id;
  ELSIF auth_admin_id IS NOT NULL AND public_admin_id IS NULL THEN
    -- Only auth user exists, create public user
    INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
    VALUES (
      auth_admin_id,
      'admin@nclexkeys.com',
      'NCLEX Keys Admin',
      'instructor',
      '+234-000-0000',
      NOW(),
      NOW()
    );
    
    RAISE NOTICE 'Created public user with auth user ID: %', auth_admin_id;
  ELSIF auth_admin_id IS NULL AND public_admin_id IS NOT NULL THEN
    -- Only public user exists, this is a problem
    RAISE NOTICE 'Only public user exists, this is unexpected';
  ELSE
    -- Neither exists, create both
    RAISE NOTICE 'Neither user exists, creating both';
  END IF;
END $$;

-- Step 5: Update the auth user password
SELECT 'Step 5: Updating auth user password' as info;
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin2025', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Step 6: Verify the fix
SELECT 'Step 6: Verifying the fix' as info;
SELECT 
  au.id as auth_id,
  pu.id as public_id,
  au.email as auth_email,
  pu.email as public_email,
  pu.role as public_role,
  au.email_confirmed_at as email_confirmed,
  CASE 
    WHEN au.id = pu.id THEN '✅ IDs MATCH'
    ELSE '❌ IDs DO NOT MATCH'
  END as id_status
FROM auth.users au
JOIN public.users pu ON au.id = pu.id
WHERE au.email = 'admin@nclexkeys.com';

-- Step 7: Final status
SELECT 'Step 7: Final status' as info;
SELECT 
  '✅ Admin account fixed and ready!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Try logging in now!' as action;
