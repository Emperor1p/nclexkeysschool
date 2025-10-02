import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InstructorStats } from "@/components/dashboard/instructor-stats"
import { CourseManagement } from "@/components/dashboard/course-management"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function InstructorDashboardPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user data and verify instructor role
  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (userData?.role !== "instructor") {
    redirect("/dashboard")
  }

  // Get all programs
  const { data: programs } = await supabase.from("programs").select("*").order("created_at", { ascending: false })

  // Get courses created by this instructor
  const { data: courses } = await supabase
    .from("courses")
    .select("*, programs(name)")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false })

  // Get total enrollments across all programs
  const { data: enrollments } = await supabase.from("enrollments").select("*").eq("status", "active")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-500/5 to-background">
      <DashboardHeader user={userData} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Instructor Dashboard
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">Manage your courses and track student progress</p>
          </div>
          <Button 
            asChild
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/dashboard/instructor/create-course">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <InstructorStats
          totalCourses={courses?.length || 0}
          totalPrograms={programs?.length || 0}
          totalStudents={enrollments?.length || 0}
        />

        {/* Course Management */}
        <CourseManagement courses={courses || []} programs={programs || []} />
      </main>
    </div>
  )
}
