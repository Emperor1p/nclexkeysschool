-- FINAL FIX for users table INSERT permission
-- This will definitely solve the 401 error

-- Step 1: Check if RLS is enabled (it should be)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- Step 2: Drop ALL existing policies on users table
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable read access for users based on user_id" ON users;

-- Step 3: Create fresh policies

-- Allow users to SELECT their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to UPDATE their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRITICAL: Allow authenticated users to INSERT their own record
-- This is the key policy that's causing the 401 error
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Step 4: Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY cmd, policyname;

-- Step 5: Test if the policy works (this should show your user can insert)
-- You should see TRUE if the policy is working
SELECT 
  'Policy check - Can insert:' as test,
  has_table_privilege('users', 'INSERT') as can_insert;


