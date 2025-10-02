-- Fix Existing Admin Account
-- This script updates the existing admin account instead of creating a new one

-- Step 1: Check existing admin records
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
  created_at,
  updated_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

SELECT 
  id,
  email,
  full_name,
  role,
  created_at,
  updated_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 3: Update existing admin password in auth.users
SELECT 'Step 3: Updating admin password in auth.users' as info;
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin2025', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Step 4: Update existing admin role in public.users
SELECT 'Step 4: Updating admin role in public.users' as info;
UPDATE public.users 
SET 
  role = 'instructor',
  full_name = 'NCLEX Keys Admin',
  phone_number = '+234-000-0000',
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Step 5: Verify the updates
SELECT 'Step 5: Verifying updates' as info;
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  au.email as auth_email,
  au.email_confirmed_at,
  au.updated_at as auth_updated
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'admin@nclexkeys.com';

-- Step 6: Test the account
SELECT 'Step 6: Testing admin account' as info;
SELECT 
  '✅ Admin account updated successfully!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Email confirmed: ' || CASE WHEN au.email_confirmed_at IS NOT NULL THEN 'YES' ELSE 'NO' END as email_status
FROM auth.users au
WHERE au.email = 'admin@nclexkeys.com';

-- Step 7: Final status
SELECT 'Step 7: Final status' as info;
SELECT 
  'Admin account is ready for login!' as status,
  'Try logging in with the credentials above' as action;
