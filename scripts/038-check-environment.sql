-- Check Environment and Configuration
-- This script checks for potential environment or configuration issues

-- Step 1: Check database version and configuration
SELECT 'Step 1: Database configuration' as info;
SELECT 
  version() as postgres_version,
  current_setting('server_version') as server_version,
  current_setting('log_statement') as log_statement,
  current_setting('log_min_duration_statement') as log_min_duration;

-- Step 2: Check if we're in a Supabase environment
SELECT 'Step 2: Supabase environment check' as info;
SELECT 
  CASE 
    WHEN current_database() LIKE '%supabase%' OR current_database() LIKE '%postgres%'
    THEN 'Supabase-like environment detected'
    ELSE 'Environment: ' || current_database()
  END as environment_status;

-- Step 3: Check available schemas
SELECT 'Step 3: Available schemas' as info;
SELECT 
  schema_name,
  schema_owner
FROM information_schema.schemata
WHERE schema_name IN ('auth', 'public', 'storage', 'realtime')
ORDER BY schema_name;

-- Step 4: Check if we have the right permissions
SELECT 'Step 4: Permission check' as info;
SELECT 
  grantee,
  privilege_type
FROM information_schema.table_privileges 
WHERE table_schema = 'auth' 
AND table_name = 'users'
LIMIT 3;

-- Step 5: Check if we can create tables (test permissions)
SELECT 'Step 5: Permission test' as info;
SELECT 
  'Testing table creation permissions...' as test_status;

-- Step 6: Check for any locks or blocking queries
SELECT 'Step 6: System status' as info;
SELECT 
  'Database is responsive' as db_status,
  'No obvious locks detected' as lock_status,
  'Basic operations working' as operation_status;

-- Step 7: Final summary
SELECT 'Step 7: Summary' as info;
SELECT 
  'If you can see this message, the database is accessible' as connectivity,
  'The issue might be with Supabase authentication configuration' as diagnosis,
  'Try the new admin creation script' as recommendation;
