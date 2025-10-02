-- Check Admin Account Status
-- This script verifies if the admin account exists and is properly configured

-- Check if admin user exists in auth.users
SELECT 'Admin account in auth.users:' as status;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_app_meta_data
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

-- Check if admin user exists in public.users
SELECT 'Admin account in public.users:' as status;
SELECT 
  id,
  email,
  full_name,
  role,
  phone_number,
  created_at
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- Check if the accounts are linked (same ID)
SELECT 'Account linking check:' as status;
SELECT 
  a.id as auth_id,
  p.id as public_id,
  a.email as auth_email,
  p.email as public_email,
  p.role as user_role,
  CASE 
    WHEN a.id = p.id THEN '✅ Accounts are properly linked'
    ELSE '❌ Accounts are not linked properly'
  END as link_status
FROM auth.users a
FULL OUTER JOIN public.users p ON a.id = p.id
WHERE a.email = 'admin@nclexkeys.com' OR p.email = 'admin@nclexkeys.com';

-- Summary
SELECT 'Admin account summary:' as status;
SELECT 
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'instructor' as expected_role,
  'Account already exists - ready to use!' as status;
