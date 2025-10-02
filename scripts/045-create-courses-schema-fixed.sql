-- Create courses and course materials schema (Fixed Version)
-- This script creates the necessary tables for the course management system

-- First, let's check if we have the auth.users table
SELECT 'Checking auth.users table...' as info;

-- Create courses table (without foreign key initially)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id UUID, -- Will add foreign key later
    duration VARCHAR(100),
    price VARCHAR(50),
    category VARCHAR(100) DEFAULT 'NCLEX-RN',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_materials table
CREATE TABLE IF NOT EXISTS public.course_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID, -- Will add foreign key later
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
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID, -- Will add foreign key later
    student_id UUID, -- Will add foreign key later
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    UNIQUE(course_id, student_id)
);

-- Create material_progress table
CREATE TABLE IF NOT EXISTS public.material_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id UUID, -- Will add foreign key later
    material_id UUID, -- Will add foreign key later
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent INTEGER DEFAULT 0, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(enrollment_id, material_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Instructors can view their own courses" ON public.courses
    FOR SELECT USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can insert their own courses" ON public.courses
    FOR INSERT WITH CHECK (instructor_id = auth.uid());

CREATE POLICY "Instructors can update their own courses" ON public.courses
    FOR UPDATE USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can delete their own courses" ON public.courses
    FOR DELETE USING (instructor_id = auth.uid());

-- RLS Policies for course_materials
CREATE POLICY "Instructors can manage materials for their courses" ON public.course_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND instructor_id = auth.uid()
        )
    );

-- RLS Policies for course_enrollments
CREATE POLICY "Students can view their own enrollments" ON public.course_enrollments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll in courses" ON public.course_enrollments
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own enrollments" ON public.course_enrollments
    FOR UPDATE USING (student_id = auth.uid());

-- RLS Policies for material_progress
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON public.courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_course_materials_course_id ON public.course_materials(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_student_id ON public.course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_material_progress_enrollment_id ON public.material_progress(enrollment_id);

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

-- Try to add foreign keys if auth.users exists
DO $$
BEGIN
    -- Check if auth.users table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        -- Add foreign key constraints
        ALTER TABLE public.courses ADD CONSTRAINT fk_courses_instructor_id 
            FOREIGN KEY (instructor_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        
        ALTER TABLE public.course_materials ADD CONSTRAINT fk_course_materials_course_id 
            FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
        
        ALTER TABLE public.course_enrollments ADD CONSTRAINT fk_course_enrollments_course_id 
            FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
        
        ALTER TABLE public.course_enrollments ADD CONSTRAINT fk_course_enrollments_student_id 
            FOREIGN KEY (student_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        
        ALTER TABLE public.material_progress ADD CONSTRAINT fk_material_progress_enrollment_id 
            FOREIGN KEY (enrollment_id) REFERENCES public.course_enrollments(id) ON DELETE CASCADE;
        
        ALTER TABLE public.material_progress ADD CONSTRAINT fk_material_progress_material_id 
            FOREIGN KEY (material_id) REFERENCES public.course_materials(id) ON DELETE CASCADE;
        
        RAISE NOTICE 'Foreign key constraints added successfully';
    ELSE
        RAISE NOTICE 'auth.users table not found - skipping foreign key constraints';
    END IF;
END $$;

-- Insert sample data for testing (only if we have an admin user)
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Try to find an admin user
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@nclexkeys.com' LIMIT 1;
    
    IF admin_user_id IS NOT NULL THEN
        -- Insert sample courses
        INSERT INTO public.courses (title, description, instructor_id, duration, price, category, status) VALUES
        ('NCLEX-RN Comprehensive Review', 'Complete review of NCLEX-RN exam topics with practice questions', 
         admin_user_id, '12 weeks', '$299', 'NCLEX-RN', 'active'),
        ('Pharmacology Fundamentals', 'Essential pharmacology concepts for nursing practice',
         admin_user_id, '8 weeks', '$199', 'NCLEX-RN', 'active')
        ON CONFLICT DO NOTHING;

        -- Insert sample materials for the first course
        INSERT INTO public.course_materials (course_id, title, description, type, file_name, duration, order_index) VALUES
        ((SELECT id FROM public.courses WHERE title = 'NCLEX-RN Comprehensive Review' LIMIT 1),
         'Introduction to NCLEX-RN', 'Overview of the NCLEX-RN exam structure and format', 'video', 'intro-video.mp4', '45 min', 1),
        ((SELECT id FROM public.courses WHERE title = 'NCLEX-RN Comprehensive Review' LIMIT 1),
         'Medical-Surgical Nursing Fundamentals', 'Core concepts in medical-surgical nursing', 'video', 'med-surg-video.mp4', '60 min', 2),
        ((SELECT id FROM public.courses WHERE title = 'NCLEX-RN Comprehensive Review' LIMIT 1),
         'Pharmacology Study Guide', 'Comprehensive guide to nursing pharmacology', 'pdf', 'pharmacology-guide.pdf', '30 min', 3),
        ((SELECT id FROM public.courses WHERE title = 'NCLEX-RN Comprehensive Review' LIMIT 1),
         'Critical Thinking in Nursing', 'Developing critical thinking skills for NCLEX', 'slides', 'critical-thinking.pptx', '40 min', 4)
        ON CONFLICT DO NOTHING;

        -- Insert sample materials for the second course
        INSERT INTO public.course_materials (course_id, title, description, type, file_name, duration, order_index) VALUES
        ((SELECT id FROM public.courses WHERE title = 'Pharmacology Fundamentals' LIMIT 1),
         'Drug Classifications', 'Understanding different drug categories', 'video', 'drug-classifications.mp4', '50 min', 1),
        ((SELECT id FROM public.courses WHERE title = 'Pharmacology Fundamentals' LIMIT 1),
         'Medication Administration', 'Safe medication administration practices', 'pdf', 'medication-admin.pdf', '25 min', 2)
        ON CONFLICT DO NOTHING;

        RAISE NOTICE 'Sample data inserted successfully';
    ELSE
        RAISE NOTICE 'No admin user found - skipping sample data insertion';
    END IF;
END $$;

SELECT '✅ Courses schema created successfully!' as status;
