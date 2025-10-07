-- Create Courses Schema - Simple Version
-- This script creates the necessary tables for the course management system

-- Step 1: Check if tables already exist
SELECT 'Step 1: Checking existing tables' as info;
SELECT schemaname, tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('courses', 'course_materials', 'course_enrollments', 'material_progress');

-- Step 2: Create courses table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id UUID,
    duration VARCHAR(100),
    price VARCHAR(50),
    category VARCHAR(100) DEFAULT 'NCLEX-RN',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create course_materials table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.course_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('video', 'pdf', 'slides')),
    file_url TEXT,
    file_name VARCHAR(255),
    file_size BIGINT,
    duration VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create course_enrollments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID,
    student_id UUID,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    UNIQUE(course_id, student_id)
);

-- Step 5: Create material_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.material_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID,
    material_id UUID,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(enrollment_id, material_id)
);

-- Step 6: Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON public.courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON public.course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_student_id ON public.course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_material_progress_enrollment_id ON public.material_progress(enrollment_id);

-- Step 7: Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_progress ENABLE ROW LEVEL SECURITY;

-- Step 8: Create basic RLS policies (allow all for now)
DROP POLICY IF EXISTS "Allow all courses" ON public.courses;
CREATE POLICY "Allow all courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all course materials" ON public.course_materials;
CREATE POLICY "Allow all course materials" ON public.course_materials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all enrollments" ON public.course_enrollments;
CREATE POLICY "Allow all enrollments" ON public.course_enrollments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all material progress" ON public.material_progress;
CREATE POLICY "Allow all material progress" ON public.material_progress FOR ALL USING (true) WITH CHECK (true);

-- Step 9: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 10: Create triggers for updated_at
DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_course_materials_updated_at ON public.course_materials;
CREATE TRIGGER update_course_materials_updated_at BEFORE UPDATE ON public.course_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_material_progress_updated_at ON public.material_progress;
CREATE TRIGGER update_material_progress_updated_at BEFORE UPDATE ON public.material_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 11: Final verification
SELECT 'Step 11: Final verification' as info;
SELECT 
  '✅ Courses schema created successfully!' as status,
  (SELECT COUNT(*) FROM public.courses) as existing_courses,
  (SELECT COUNT(*) FROM public.course_materials) as existing_materials;

