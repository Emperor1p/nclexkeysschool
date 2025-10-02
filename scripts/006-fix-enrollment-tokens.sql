-- Fix enrollment_tokens table foreign key and RLS policies
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view unused enrollment tokens" ON enrollment_tokens;
DROP POLICY IF EXISTS "Authenticated users can update enrollment tokens" ON enrollment_tokens;
DROP POLICY IF EXISTS "System can update enrollment tokens" ON enrollment_tokens;

-- Step 2: Ensure the foreign key constraint exists
-- First, check if constraint exists and drop it if needed
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

-- Add the foreign key constraint
ALTER TABLE enrollment_tokens 
ADD CONSTRAINT enrollment_tokens_program_id_fkey 
FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE;

-- Step 3: Create RLS policies for enrollment_tokens
-- Allow anyone (including anonymous users) to view unused tokens during registration
CREATE POLICY "Anyone can view unused enrollment tokens" ON enrollment_tokens
  FOR SELECT 
  USING (is_used = FALSE);

-- Allow authenticated users to update tokens (mark as used)
CREATE POLICY "Authenticated users can update enrollment tokens" ON enrollment_tokens
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Step 4: Verify the setup
-- This should return the policies we just created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'enrollment_tokens';

-- This should show the foreign key relationship
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name='enrollment_tokens';


