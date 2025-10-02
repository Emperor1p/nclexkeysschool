-- Fix users table RLS policies to allow INSERT during registration
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing policies for users table
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;

-- Step 2: Create proper RLS policies for users table

-- Allow authenticated users to view their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRITICAL: Allow authenticated users to insert their own record during registration
-- This is what was missing!
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Step 3: Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;


