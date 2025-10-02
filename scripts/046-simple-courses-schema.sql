-- Simple courses schema - minimal version
-- This creates the basic tables needed for the course management system

-- Drop existing tables if they exist (in reverse order due to dependencies)
DROP TABLE IF EXISTS public.material_progress CASCADE;
DROP TABLE IF EXISTS public.course_enrollments CASCADE;
DROP TABLE IF EXISTS public.course_materials CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;

-- Create courses table
CREATE TABLE public.courses (
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

-- Create course_materials table
CREATE TABLE public.course_materials (
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

-- Create course_enrollments table
CREATE TABLE public.course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID,
    student_id UUID,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    UNIQUE(course_id, student_id)
);

-- Create material_progress table
CREATE TABLE public.material_progress (
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

-- Create indexes
CREATE INDEX idx_courses_instructor_id ON public.courses(instructor_id);
CREATE INDEX idx_courses_status ON public.courses(status);
CREATE INDEX idx_course_materials_course_id ON public.course_materials(course_id);
CREATE INDEX idx_course_enrollments_student_id ON public.course_enrollments(student_id);
CREATE INDEX idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX idx_material_progress_enrollment_id ON public.material_progress(enrollment_id);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_progress ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
CREATE POLICY "Users can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Users can insert courses" ON public.courses FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update courses" ON public.courses FOR UPDATE USING (true);
CREATE POLICY "Users can delete courses" ON public.courses FOR DELETE USING (true);

CREATE POLICY "Users can view course materials" ON public.course_materials FOR SELECT USING (true);
CREATE POLICY "Users can insert course materials" ON public.course_materials FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update course materials" ON public.course_materials FOR UPDATE USING (true);
CREATE POLICY "Users can delete course materials" ON public.course_materials FOR DELETE USING (true);

CREATE POLICY "Users can view enrollments" ON public.course_enrollments FOR SELECT USING (true);
CREATE POLICY "Users can insert enrollments" ON public.course_enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update enrollments" ON public.course_enrollments FOR UPDATE USING (true);
CREATE POLICY "Users can delete enrollments" ON public.course_enrollments FOR DELETE USING (true);

CREATE POLICY "Users can view material progress" ON public.material_progress FOR SELECT USING (true);
CREATE POLICY "Users can insert material progress" ON public.material_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update material progress" ON public.material_progress FOR UPDATE USING (true);
CREATE POLICY "Users can delete material progress" ON public.material_progress FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_materials_updated_at BEFORE UPDATE ON public.course_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_material_progress_updated_at BEFORE UPDATE ON public.material_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT '✅ Simple courses schema created successfully!' as status;
