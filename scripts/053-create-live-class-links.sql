-- Create live_class_links table for Zoom/video call links
-- Run this script in Supabase SQL Editor

-- Step 1: Create the live_class_links table
CREATE TABLE IF NOT EXISTS live_class_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instructor_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    link_url TEXT NOT NULL,
    meeting_platform TEXT DEFAULT 'zoom', -- zoom, google-meet, teams, etc.
    scheduled_time TIMESTAMP WITH TIME ZONE,
    duration TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_live_class_links_instructor ON live_class_links(instructor_id);
CREATE INDEX IF NOT EXISTS idx_live_class_links_active ON live_class_links(is_active);
CREATE INDEX IF NOT EXISTS idx_live_class_links_scheduled ON live_class_links(scheduled_time);

-- Step 3: Enable Row Level Security (RLS)
ALTER TABLE live_class_links ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if any
DROP POLICY IF EXISTS "Instructors can manage their own live class links" ON live_class_links;
DROP POLICY IF EXISTS "Students can view active live class links" ON live_class_links;

-- Step 5: Create RLS policies
-- Instructors can create, view, update, and delete their own links
CREATE POLICY "Instructors can manage their own live class links"
ON live_class_links
FOR ALL
USING (
    auth.uid() = instructor_id
);

-- All authenticated users can view active links
CREATE POLICY "Students can view active live class links"
ON live_class_links
FOR SELECT
USING (
    is_active = true
);

-- Step 6: Verification
SELECT 'Step 6: Verification' as info;
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename = 'live_class_links';

-- Show table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'live_class_links'
ORDER BY ordinal_position;

-- Show RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'live_class_links';

SELECT 'Setup complete! Instructors can now add live class links.' as success;
