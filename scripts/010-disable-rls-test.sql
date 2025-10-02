-- TEMPORARY FIX: Disable RLS on users table to test if that's the issue
-- THIS IS FOR TESTING ONLY - We'll fix it properly after

-- Step 1: Temporarily disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Step 2: Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- This should show: rowsecurity = false

-- Step 3: Check all policies (they still exist but are not enforced)
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename = 'users';


