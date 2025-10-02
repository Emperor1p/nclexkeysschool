"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, CheckCircle, FileText, ExternalLink } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface CourseListProps {
  courses: any[]
  userProgress: any[]
}

export function CourseList({ courses, userProgress }: CourseListProps) {
  const [loadingCourse, setLoadingCourse] = useState<string | null>(null)

  const isCourseCompleted = (courseId: string) => {
    return userProgress.some((p) => p.course_id === courseId && p.completed)
  }

  const handleMarkComplete = async (courseId: string) => {
    setLoadingCourse(courseId)
    const supabase = getSupabaseBrowserClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const existingProgress = userProgress.find((p) => p.course_id === courseId)

    if (existingProgress) {
      await supabase
        .from("user_progress")
        .update({ completed: !existingProgress.completed, last_accessed: new Date().toISOString() })
        .eq("id", existingProgress.id)
    } else {
      await supabase.from("user_progress").insert({
        user_id: user.id,
        course_id: courseId,
        completed: true,
        last_accessed: new Date().toISOString(),
      })
    }

    setLoadingCourse(null)
    window.location.reload()
  }

  if (courses.length === 0) {
    return (
      <Card className="border-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Your Courses
          </CardTitle>
          <CardDescription className="text-base">
            No courses available yet. Please complete your enrollment.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Your Courses
        </CardTitle>
        <CardDescription className="text-base text-enhanced">
          Access your video lectures and study materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => {
            const completed = isCourseCompleted(course.id)
            return (
              <div
                key={course.id}
                className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    completed 
                      ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-500" 
                      : "bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary"
                  }`}
                >
                  {completed ? <CheckCircle className="h-7 w-7" /> : <PlayCircle className="h-7 w-7" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {course.title}
                      </h3>
                      {course.description && (
                        <p className="text-sm text-enhanced mt-2 group-hover:text-foreground transition-colors duration-300">
                          {course.description}
                        </p>
                      )}
                    </div>
                    {completed && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-soft">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {course.video_url && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        asChild
                        className="hover:bg-primary/10 hover:border-glow transition-all duration-300"
                      >
                        <a href={course.video_url} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Watch Video
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                    {course.materials_url && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        asChild
                        className="hover:bg-primary/10 hover:border-glow transition-all duration-300"
                      >
                        <a href={course.materials_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          Study Materials
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={completed ? "secondary" : "default"}
                      onClick={() => handleMarkComplete(course.id)}
                      disabled={loadingCourse === course.id}
                      className={`transition-all duration-300 ${
                        completed ? "hover:bg-secondary/80" : "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {loadingCourse === course.id ? "Updating..." : completed ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
