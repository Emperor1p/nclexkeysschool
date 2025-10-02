import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CheckCircle, TrendingUp, Award } from "lucide-react"

interface DashboardStatsProps {
  totalCourses: number
  completedCourses: number
  progressPercentage: number
  enrollments: any[]
}

export function DashboardStats({
  totalCourses,
  completedCourses,
  progressPercentage,
  enrollments,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-primary/20 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Courses</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                {totalCourses}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <BookOpen className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2 border-green-500/20 animate-fade-in-up stagger-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Completed</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {completedCourses}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-500 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <CheckCircle className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 border-blue-500/20 animate-fade-in-up stagger-2">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Progress</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                {progressPercentage}%
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-500 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <TrendingUp className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 border-purple-500/20 animate-fade-in-up stagger-3">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
        <CardContent className="pt-8 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Programs</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-purple-500 to-pink-600 bg-clip-text text-transparent">
                {enrollments.length}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-500 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <Award className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
