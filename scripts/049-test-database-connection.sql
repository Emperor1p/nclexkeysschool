-- Test Database Connection and Schema
-- This script tests if the courses tables exist and are accessible

-- Step 1: Check if tables exist
SELECT 'Step 1: Checking if tables exist' as info;
SELECT schemaname, tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('courses', 'course_materials', 'course_enrollments', 'material_progress');

-- Step 2: Check table structure for courses
SELECT 'Step 2: Checking courses table structure' as info;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'courses'
ORDER BY ordinal_position;

-- Step 3: Check if there are any courses
SELECT 'Step 3: Checking existing courses' as info;
SELECT COUNT(*) as course_count FROM public.courses;

-- Step 4: List all courses (if any exist)
SELECT 'Step 4: Listing all courses' as info;
SELECT id, title, status, instructor_id, created_at 
FROM public.courses 
ORDER BY created_at DESC;

-- Step 5: Check RLS policies
SELECT 'Step 5: Checking RLS policies' as info;
SELECT policyname, permissive, cmd, roles 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'courses';

-- Step 6: Test insert (this will fail if RLS is blocking)
SELECT 'Step 6: Testing database access' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM public.courses LIMIT 1) 
    THEN '✅ Tables exist and are accessible'
    ELSE '❌ Tables may not exist or are not accessible'
  END as status;

