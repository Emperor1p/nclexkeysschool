-- Reset Admin Password (if needed)
-- This script updates the admin password to ensure it's set correctly

-- Update the admin password in auth.users
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin2025', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'admin@nclexkeys.com';

-- Verify the update
SELECT 'Admin password updated:' as status;
SELECT 
  email,
  'Password has been reset to: Admin2025' as message,
  updated_at
FROM auth.users 
WHERE email = 'admin@nclexkeys.com';

-- Check if the public.users record exists and has correct role
SELECT 'Public users record check:' as status;
SELECT 
  email,
  full_name,
  role,
  CASE 
    WHEN role = 'instructor' THEN '✅ Role is correct'
    ELSE '❌ Role needs to be updated'
  END as role_status
FROM public.users 
WHERE email = 'admin@nclexkeys.com';

-- If the public.users record doesn't exist, create it
INSERT INTO public.users (id, email, full_name, role, phone_number)
SELECT 
  a.id,
  a.email,
  'NCLEX Keys Admin',
  'instructor',
  '+234-000-0000'
FROM auth.users a
WHERE a.email = 'admin@nclexkeys.com'
AND NOT EXISTS (
  SELECT 1 FROM public.users p WHERE p.id = a.id
);

-- Final verification
SELECT 'Final admin account status:' as status;
SELECT 
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'instructor' as role,
  'Ready to login!' as status;
