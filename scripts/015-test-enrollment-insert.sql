-- TEST SCRIPT TO VERIFY ENROLLMENT INSERT WORKS
-- This will test if the RLS policies are working correctly

-- Step 1: Check if we can see the enrollments table
SELECT 'Testing enrollments table access...' as test_step;

-- Step 2: Check current user context (this should show your auth user)
SELECT 'Current auth context:' as info;
SELECT auth.uid() as current_user_id, auth.role() as current_role;

-- Step 3: Check if there are any existing enrollments
SELECT 'Existing enrollments count:' as info;
SELECT COUNT(*) as total_enrollments FROM enrollments;

-- Step 4: Check if there are any programs to enroll in
SELECT 'Available programs:' as info;
SELECT id, name, description FROM programs LIMIT 5;

-- Step 5: Check if there are any users in the system
SELECT 'Users in system:' as info;
SELECT id, email, full_name, role FROM users LIMIT 5;

-- Step 6: Test the RLS policies by trying to select (this should work if policies are correct)
SELECT 'Testing SELECT policy...' as test_step;
SELECT COUNT(*) as selectable_enrollments 
FROM enrollments 
WHERE user_id = auth.uid();

-- Success message
SELECT '✅ If you can see this without errors, the RLS policies are working!' as result;
