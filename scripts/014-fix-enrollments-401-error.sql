-- COMPLETE FIX FOR ENROLLMENTS 401 ERROR
-- This script will fix the RLS policies for enrollments table

-- Step 1: Check current RLS status
SELECT 'Current RLS Status:' as info;
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'enrollments';

-- Step 2: Check existing policies
SELECT 'Existing Policies:' as info;
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'enrollments';

-- Step 3: Drop ALL existing policies for enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Authenticated users can insert enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can manage their own enrollments" ON enrollments;

-- Step 4: Ensure RLS is enabled
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Step 5: Create comprehensive RLS policies

-- Policy 1: Users can view their own enrollments
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy 2: Users can create their own enrollments (THIS IS THE KEY ONE)
CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own enrollments
CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy 4: Instructors can view all enrollments (for admin purposes)
CREATE POLICY "Instructors can view all enrollments" ON enrollments
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'instructor'
    )
  );

-- Step 6: Verify the policies were created
SELECT 'New Policies Created:' as info;
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'enrollments'
ORDER BY cmd, policyname;

-- Step 7: Test the table structure
SELECT 'Table Structure:' as info;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'enrollments' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 8: Final verification
SELECT 'Final RLS Status:' as info;
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'enrollments';

-- Success message
SELECT '✅ ENROLLMENTS RLS POLICIES FIXED SUCCESSFULLY!' as result;
