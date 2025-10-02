-- Update Existing Admin Account
-- This script updates the existing admin account instead of creating a new one

-- Step 1: Check what exists
SELECT 'Step 1: Checking existing admin records' as info;
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

-- Step 2: Show existing records
SELECT 'Step 2: Existing records' as info;
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
  role,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Step 3: Update existing admin password in auth.users
SELECT 'Step 3: Updating admin password' as info;
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin2025', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Step 4: Update existing admin role in public.users
SELECT 'Step 4: Updating admin role' as info;
UPDATE public.users 
SET 
  role = 'instructor',
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
  au.email_confirmed_at
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'admin@nclexkeys.com';

-- Step 6: Final status
SELECT 'Step 6: Final status' as info;
SELECT 
  '✅ Admin account updated and ready!' as status,
  'Email: admin@nclexkeys.com' as email,
  'Password: Admin2025' as password,
  'Role: instructor' as role,
  'Try logging in now!' as action;
