-- Test course visibility and database setup
-- This script tests if courses are visible to students

-- Check if tables exist
SELECT 'Checking if tables exist...' as info;

SELECT 
    table_name,
    CASE 
        WHEN table_name = 'courses' THEN '✅ Courses table exists'
        WHEN table_name = 'course_materials' THEN '✅ Course materials table exists'
        WHEN table_name = 'course_enrollments' THEN '✅ Course enrollments table exists'
        WHEN table_name = 'material_progress' THEN '✅ Material progress table exists'
        ELSE '❌ Unknown table'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('courses', 'course_materials', 'course_enrollments', 'material_progress');

-- Check if there are any courses
SELECT 'Checking for courses...' as info;

SELECT 
    COUNT(*) as total_courses,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_courses,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_courses
FROM public.courses;

-- Show all courses with their status
SELECT 'Current courses:' as info;

SELECT 
    id,
    title,
    status,
    instructor_id,
    created_at
FROM public.courses
ORDER BY created_at DESC;

-- Test if we can query courses with materials (like the app does)
SELECT 'Testing course query with materials...' as info;

SELECT 
    c.id,
    c.title,
    c.status,
    c.instructor_id,
    COUNT(cm.id) as material_count
FROM public.courses c
LEFT JOIN public.course_materials cm ON c.id = cm.course_id
GROUP BY c.id, c.title, c.status, c.instructor_id
ORDER BY c.created_at DESC;

-- Check RLS policies
SELECT 'Checking RLS policies...' as info;

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('courses', 'course_materials', 'course_enrollments', 'material_progress');

-- If no courses exist, create a test course
DO $$
DECLARE
    test_course_id UUID;
    admin_user_id UUID;
BEGIN
    -- Check if we have any courses
    IF NOT EXISTS (SELECT 1 FROM public.courses LIMIT 1) THEN
        RAISE NOTICE 'No courses found. Creating a test course...';
        
        -- Try to find an admin user
        SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@nclexkeys.com' LIMIT 1;
        
        IF admin_user_id IS NOT NULL THEN
            -- Create a test course
            INSERT INTO public.courses (title, description, instructor_id, duration, price, category, status)
            VALUES (
                'Test NCLEX Course',
                'This is a test course to verify the system is working',
                admin_user_id,
                '4 weeks',
                '$99',
                'NCLEX-RN',
                'active'
            ) RETURNING id INTO test_course_id;
            
            -- Add some test materials
            INSERT INTO public.course_materials (course_id, title, description, type, file_name, duration, order_index)
            VALUES 
            (test_course_id, 'Introduction Video', 'Welcome to the course', 'video', 'intro.mp4', '10 min', 1),
            (test_course_id, 'Study Guide PDF', 'Complete study guide', 'pdf', 'guide.pdf', '30 min', 2);
            
            RAISE NOTICE 'Test course created with ID: %', test_course_id;
        ELSE
            RAISE NOTICE 'No admin user found. Please create an admin user first.';
        END IF;
    ELSE
        RAISE NOTICE 'Courses already exist.';
    END IF;
END $$;

-- Final check - show all active courses
SELECT 'Final check - Active courses available to students:' as info;

SELECT 
    c.id,
    c.title,
    c.description,
    c.duration,
    c.price,
    c.status,
    COUNT(cm.id) as material_count
FROM public.courses c
LEFT JOIN public.course_materials cm ON c.id = cm.course_id
WHERE c.status = 'active'
GROUP BY c.id, c.title, c.description, c.duration, c.price, c.status
ORDER BY c.created_at DESC;

SELECT '✅ Course visibility test completed!' as status;
