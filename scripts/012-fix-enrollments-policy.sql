-- Fix enrollments table RLS policies
-- This will allow authenticated users to create their own enrollments

-- Step 1: Drop existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON enrollments;

-- Step 2: Create proper policies for enrollments

-- Allow users to view their own enrollments
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow authenticated users to create enrollments for themselves
CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own enrollments (for payment screenshot, etc.)
CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Step 3: Verify the policies
SELECT 
  tablename,
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'enrollments'
ORDER BY cmd, policyname;

-- Step 4: Check if RLS is enabled (should be true)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'enrollments';


