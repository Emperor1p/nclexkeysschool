-- Create Backup Test User
-- This creates a simple test user that should definitely work

-- Step 1: Ensure RLS is disabled
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Create test user in auth.users
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
  'test@nclexkeys.com',
  crypt('Test123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  '',
  ''
);

-- Step 3: Create test user in public.users
DO $$
DECLARE
  test_user_id UUID;
BEGIN
  SELECT id INTO test_user_id FROM auth.users WHERE email = 'test@nclexkeys.com';
  
  INSERT INTO public.users (id, email, full_name, role, phone_number, created_at, updated_at)
  VALUES (
    test_user_id,
    'test@nclexkeys.com',
    'Test User',
    'instructor',
    '+234-000-0000',
    NOW(),
    NOW()
  );
  
  RAISE NOTICE 'Test user created with ID: %', test_user_id;
END $$;

-- Step 4: Show test credentials
SELECT 
  'Backup Test User Created!' as status,
  'Email: test@nclexkeys.com' as email,
  'Password: Test123' as password,
  'Role: instructor' as role,
  'Try logging in with these credentials' as instruction;
