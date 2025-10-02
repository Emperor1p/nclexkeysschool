-- Create Single Admin/Instructor Account
-- This is a shared account for all instructors/admins to access the dashboard

-- Run this script in Supabase SQL Editor

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
  INSERT INTO public.users (id, email, full_name, role, phone_number)
  VALUES (
    admin_id,
    'admin@nclexkeys.com',
    'NCLEX Keys Admin',
    'instructor',
    '+234-000-0000'
  );
END $$;

-- Display the credentials
SELECT 
  '✓ Admin account created successfully!' as status,
  'admin@nclexkeys.com' as email,
  'Admin2025' as password,
  'Use these credentials to login to the instructor dashboard' as note;
