-- Simple Admin Fix
-- This script deletes the problematic public user and recreates it correctly

-- Step 1: Check what exists
SELECT 'Step 1: Checking existing records' as info;
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

-- Step 2: Show the IDs
SELECT 'Step 2: Showing existing IDs' as info;
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

-- Step 3: Delete the problematic public user
SELECT 'Step 3: Deleting problematic public user' as info;
DELETE FROM public.users WHERE email = 'admin@nclexkeys.com';

-- Step 4: Verify deletion
SELECT 'Step 4: Verifying deletion' as info;
SELECT 
  'Public users after deletion:' as label,
  COUNT(*) as count
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 5: Create the public user with the correct auth ID
SELECT 'Step 5: Creating public user with correct auth ID' as info;

DO $$
DECLARE
  auth_admin_id UUID;
BEGIN
  -- Get the auth user ID
  SELECT id INTO auth_admin_id FROM auth.users WHERE email = 'admin@nclexkeys.com';
  
  IF auth_admin_id IS NOT NULL THEN
    -- Create public user with the auth user ID
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
  ELSE
    RAISE NOTICE 'No auth user found for admin@nclexkeys.com';
  END IF;
END $$;

-- Step 6: Update the auth user password
SELECT 'Step 6: Updating auth user password' as info;
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin2025', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Step 7: Verify the fix
SELECT 'Step 7: Verifying the fix' as info;
SELECT 
  au.id as auth_id,
  pu.id as public_id,
  au.email as auth_email,
  pu.email as public_email,
  pu.role as public_role,
  au.email_confirmed_at as email_confirmed
FROM auth.users au
JOIN public.users pu ON au.id = pu.id
WHERE au.email = 'admin@nclexkeys.com';

-- Step 8: Final status
SELECT 'Step 8: Final status' as info;
SELECT 
  '✅ Admin account fixed and ready!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Try logging in now!' as action;
