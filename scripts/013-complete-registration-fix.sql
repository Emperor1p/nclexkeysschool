-- COMPLETE REGISTRATION FIX - Run this entire script at once
-- This fixes all RLS policies needed for registration to work

-- ============================================
-- PART 1: Fix enrollment_tokens table
-- ============================================

DROP POLICY IF EXISTS "Anyone can view unused enrollment tokens" ON enrollment_tokens;
DROP POLICY IF EXISTS "Authenticated users can update enrollment tokens" ON enrollment_tokens;

CREATE POLICY "Anyone can view unused enrollment tokens" ON enrollment_tokens
  FOR SELECT 
  USING (is_used = FALSE);

CREATE POLICY "Authenticated users can update enrollment tokens" ON enrollment_tokens
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- PART 2: Fix enrollments table (THIS IS YOUR CURRENT ISSUE)
-- ============================================

-- Enable RLS on enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON enrollments;

-- Create comprehensive policies
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- PART 3: Verify user trigger exists
-- ============================================

-- Check if the trigger exists
SELECT 
  'User creation trigger:' as info,
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- PART 4: Verify all policies
-- ============================================

-- Check enrollment_tokens policies
SELECT 'enrollment_tokens policies:' as table_name, policyname, cmd
FROM pg_policies
WHERE tablename = 'enrollment_tokens'
UNION ALL
-- Check enrollments policies
SELECT 'enrollments policies:' as table_name, policyname, cmd
FROM pg_policies
WHERE tablename = 'enrollments'
UNION ALL
-- Check users policies
SELECT 'users policies:' as table_name, policyname, cmd
FROM pg_policies
WHERE tablename = 'users'
ORDER BY table_name, cmd;

-- ============================================
-- PART 5: Verify RLS is enabled
-- ============================================

SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'enrollments', 'enrollment_tokens')
ORDER BY tablename;


