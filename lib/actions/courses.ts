"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface CourseData {
  title: string;
  description: string;
  duration: string;
  price: string;
  category: string;
}

export interface CourseMaterial {
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'slides';
  file_name?: string;
  file_url?: string;
  file_size?: number;
  duration?: string;
  order_index: number;
}

export async function createCourse(
  courseData: CourseData,
  materials: CourseMaterial[]
) {
  const supabase = await getSupabaseServerClient();
  
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Create course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: courseData.title,
        description: courseData.description,
        instructor_id: user.id,
        duration: courseData.duration,
        price: courseData.price,
        category: courseData.category,
        status: 'draft'
      })
      .select()
      .single();

    if (courseError) {
      throw new Error(`Failed to create course: ${courseError.message}`);
    }

    // Create course materials
    if (materials.length > 0) {
      const materialsWithCourseId = materials.map(material => ({
        ...material,
        course_id: course.id
      }));

      const { error: materialsError } = await supabase
        .from('course_materials')
        .insert(materialsWithCourseId);

      if (materialsError) {
        // If materials fail, delete the course
        await supabase.from('courses').delete().eq('id', course.id);
        throw new Error(`Failed to create materials: ${materialsError.message}`);
      }
    }

    revalidatePath('/dashboard/instructor');
    return { success: true, course };
  } catch (error) {
    console.error('Error creating course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getInstructorCourses() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Get courses with materials
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select(`
        *,
        course_materials(*),
        course_enrollments(count)
      `)
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false });

    if (coursesError) {
      throw new Error(`Failed to fetch courses: ${coursesError.message}`);
    }

    return { success: true, courses: courses || [] };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getStudentCourses() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Get enrolled courses with materials and progress
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        courses(
          *,
          course_materials(*),
          users!courses_instructor_id_fkey(full_name)
        ),
        material_progress(*)
      `)
      .eq('student_id', user.id)
      .eq('status', 'active')
      .order('enrolled_at', { ascending: false });

    if (enrollmentsError) {
      throw new Error(`Failed to fetch enrollments: ${enrollmentsError.message}`);
    }

    return { success: true, enrollments: enrollments || [] };
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateCourseStatus(courseId: string, status: 'draft' | 'active' | 'archived') {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('courses')
      .update({ status })
      .eq('id', courseId)
      .eq('instructor_id', user.id);

    if (error) {
      throw new Error(`Failed to update course: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    return { success: true };
  } catch (error) {
    console.error('Error updating course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteCourse(courseId: string) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId)
      .eq('instructor_id', user.id);

    if (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    return { success: true };
  } catch (error) {
    console.error('Error deleting course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function enrollInCourse(courseId: string) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('student_id', user.id)
      .single();

    if (existingEnrollment) {
      return { success: false, error: 'Already enrolled in this course' };
    }

    // Enroll in course
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        student_id: user.id,
        status: 'active'
      })
      .select()
      .single();

    if (enrollmentError) {
      throw new Error(`Failed to enroll: ${enrollmentError.message}`);
    }

    // Create material progress entries
    const { data: materials } = await supabase
      .from('course_materials')
      .select('id')
      .eq('course_id', courseId);

    if (materials && materials.length > 0) {
      const progressEntries = materials.map(material => ({
        enrollment_id: enrollment.id,
        material_id: material.id,
        completed: false
      }));

      await supabase
        .from('material_progress')
        .insert(progressEntries);
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/student');
    return { success: true, enrollment };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
