-- COMPLETE FIX: All RLS Policies and Foreign Keys
-- Run this ENTIRE script in your Supabase SQL Editor
-- This will fix all permission issues for registration

-- ============================================
-- STEP 1: Fix enrollment_tokens table
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view unused enrollment tokens" ON enrollment_tokens;
DROP POLICY IF EXISTS "Authenticated users can update enrollment tokens" ON enrollment_tokens;
DROP POLICY IF EXISTS "System can update enrollment tokens" ON enrollment_tokens;

-- Ensure foreign key constraint exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'enrollment_tokens_program_id_fkey'
        AND table_name = 'enrollment_tokens'
    ) THEN
        ALTER TABLE enrollment_tokens DROP CONSTRAINT enrollment_tokens_program_id_fkey;
    END IF;
END $$;

ALTER TABLE enrollment_tokens 
ADD CONSTRAINT enrollment_tokens_program_id_fkey 
FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE;

-- Create RLS policies for enrollment_tokens
CREATE POLICY "Anyone can view unused enrollment tokens" ON enrollment_tokens
  FOR SELECT 
  USING (is_used = FALSE);

CREATE POLICY "Authenticated users can update enrollment tokens" ON enrollment_tokens
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- ============================================
-- STEP 2: Fix users table
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE 
  USING (auth.uid() = id);

-- CRITICAL: Allow users to insert during registration
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================
-- STEP 3: Fix enrollments table
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
DROP POLICY IF EXISTS "Users can create their own enrollments" ON enrollments;

-- Create RLS policies for enrollments
CREATE POLICY "Users can view their own enrollments" ON enrollments
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" ON enrollments
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- STEP 4: Verify everything is set up correctly
-- ============================================

-- Check enrollment_tokens policies
SELECT 'enrollment_tokens policies:' as info;
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename = 'enrollment_tokens'
ORDER BY policyname;

-- Check users policies
SELECT 'users policies:' as info;
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

-- Check enrollments policies
SELECT 'enrollments policies:' as info;
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename = 'enrollments'
ORDER BY policyname;

-- Check foreign key
SELECT 'enrollment_tokens foreign key:' as info;
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name='enrollment_tokens';


