-- Fix course relationships and foreign keys
-- This script establishes proper relationships between tables

-- First, let's check the current state
SELECT 'Checking current table structure...' as info;

-- Drop existing foreign key constraints if they exist
ALTER TABLE public.course_materials DROP CONSTRAINT IF EXISTS fk_course_materials_course_id;
ALTER TABLE public.course_enrollments DROP CONSTRAINT IF EXISTS fk_course_enrollments_course_id;
ALTER TABLE public.course_enrollments DROP CONSTRAINT IF EXISTS fk_course_enrollments_student_id;
ALTER TABLE public.material_progress DROP CONSTRAINT IF EXISTS fk_material_progress_enrollment_id;
ALTER TABLE public.material_progress DROP CONSTRAINT IF EXISTS fk_material_progress_material_id;

-- Add foreign key constraints
ALTER TABLE public.course_materials 
ADD CONSTRAINT fk_course_materials_course_id 
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

ALTER TABLE public.course_enrollments 
ADD CONSTRAINT fk_course_enrollments_course_id 
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- Only add student_id foreign key if auth.users exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        ALTER TABLE public.course_enrollments 
        ADD CONSTRAINT fk_course_enrollments_student_id 
        FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        
        RAISE NOTICE 'Added student_id foreign key constraint';
    ELSE
        RAISE NOTICE 'auth.users table not found - skipping student_id foreign key';
    END IF;
END $$;

ALTER TABLE public.material_progress 
ADD CONSTRAINT fk_material_progress_enrollment_id 
FOREIGN KEY (enrollment_id) REFERENCES public.course_enrollments(id) ON DELETE CASCADE;

ALTER TABLE public.material_progress 
ADD CONSTRAINT fk_material_progress_material_id 
FOREIGN KEY (material_id) REFERENCES public.course_materials(id) ON DELETE CASCADE;

-- Update RLS policies to be more specific
DROP POLICY IF EXISTS "Users can view courses" ON public.courses;
DROP POLICY IF EXISTS "Users can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Users can update courses" ON public.courses;
DROP POLICY IF EXISTS "Users can delete courses" ON public.courses;

DROP POLICY IF EXISTS "Users can view course materials" ON public.course_materials;
DROP POLICY IF EXISTS "Users can insert course materials" ON public.course_materials;
DROP POLICY IF EXISTS "Users can update course materials" ON public.course_materials;
DROP POLICY IF EXISTS "Users can delete course materials" ON public.course_materials;

DROP POLICY IF EXISTS "Users can view enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Users can insert enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Users can update enrollments" ON public.course_enrollments;
DROP POLICY IF EXISTS "Users can delete enrollments" ON public.course_enrollments;

DROP POLICY IF EXISTS "Users can view material progress" ON public.material_progress;
DROP POLICY IF EXISTS "Users can insert material progress" ON public.material_progress;
DROP POLICY IF EXISTS "Users can update material progress" ON public.material_progress;
DROP POLICY IF EXISTS "Users can delete material progress" ON public.material_progress;

-- Create proper RLS policies
CREATE POLICY "Instructors can view their own courses" ON public.courses
    FOR SELECT USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can insert their own courses" ON public.courses
    FOR INSERT WITH CHECK (instructor_id = auth.uid());

CREATE POLICY "Instructors can update their own courses" ON public.courses
    FOR UPDATE USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can delete their own courses" ON public.courses
    FOR DELETE USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can manage materials for their courses" ON public.course_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND instructor_id = auth.uid()
        )
    );

CREATE POLICY "Students can view their own enrollments" ON public.course_enrollments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll in courses" ON public.course_enrollments
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own enrollments" ON public.course_enrollments
    FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Students can view their own progress" ON public.material_progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.course_enrollments 
            WHERE id = enrollment_id AND student_id = auth.uid()
        )
    );

CREATE POLICY "Students can update their own progress" ON public.material_progress
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.course_enrollments 
            WHERE id = enrollment_id AND student_id = auth.uid()
        )
    );

-- Test the relationships
SELECT 'Testing relationships...' as info;

-- Test if we can query courses with materials
SELECT 
    c.id,
    c.title,
    COUNT(cm.id) as material_count
FROM public.courses c
LEFT JOIN public.course_materials cm ON c.id = cm.course_id
GROUP BY c.id, c.title
LIMIT 5;

SELECT '✅ Relationships fixed successfully!' as status;
