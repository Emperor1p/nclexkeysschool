-- Check Supabase Project Configuration
-- This script diagnoses potential Supabase project issues

-- Step 1: Check if we're in the right database
SELECT 'Step 1: Database information' as info;
SELECT 
  current_database() as database_name,
  current_user as current_user,
  inet_server_addr() as server_address,
  inet_server_port() as server_port;

-- Step 2: Check if auth schema exists and is accessible
SELECT 'Step 2: Auth schema check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') 
    THEN 'Auth schema exists'
    ELSE 'Auth schema NOT FOUND'
  END as auth_schema_status;

-- Step 3: Check if public schema exists and is accessible
SELECT 'Step 3: Public schema check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = 'public') 
    THEN 'Public schema exists'
    ELSE 'Public schema NOT FOUND'
  END as public_schema_status;

-- Step 4: Check if auth.users table exists
SELECT 'Step 4: Auth.users table check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') 
    THEN 'Auth.users table exists'
    ELSE 'Auth.users table NOT FOUND'
  END as auth_users_status;

-- Step 5: Check if public.users table exists
SELECT 'Step 5: Public.users table check' as info;
SELECT 
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') 
    THEN 'Public.users table exists'
    ELSE 'Public.users table NOT FOUND'
  END as public_users_status;

-- Step 6: Check table permissions
SELECT 'Step 6: Table permissions check' as info;
SELECT 
  table_name,
  privilege_type
FROM information_schema.table_privileges 
WHERE table_schema = 'auth' 
AND table_name = 'users'
LIMIT 5;

-- Step 7: Check if we can perform basic operations
SELECT 'Step 7: Basic operations test' as info;
SELECT 
  'Testing basic SELECT operation...' as test_1;
SELECT COUNT(*) as auth_users_count FROM auth.users;

SELECT 
  'Testing basic SELECT operation on public.users...' as test_2;
SELECT COUNT(*) as public_users_count FROM public.users;

-- Step 8: Check for any error logs or issues
SELECT 'Step 8: System status check' as info;
SELECT 
  'Database is accessible' as db_status,
  'Auth schema is accessible' as auth_status,
  'Public schema is accessible' as public_status,
  'If you see this message, basic connectivity is working' as summary;
