"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface CourseManagementProps {
  courses: any[]
  programs: any[]
}

export function CourseManagement({ courses, programs }: CourseManagementProps) {
  const [deletingCourse, setDeletingCourse] = useState<string | null>(null)

  const handleDeleteCourse = async (courseId: string) => {
    setDeletingCourse(courseId)
    const supabase = getSupabaseBrowserClient()

    await supabase.from("courses").delete().eq("id", courseId)

    setDeletingCourse(null)
    window.location.reload()
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Your Courses
        </CardTitle>
        <CardDescription className="text-base text-enhanced">
          Manage and edit your course content
        </CardDescription>
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-enhanced mb-6 text-lg">You haven't created any courses yet.</p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/dashboard/instructor/create-course">Create Your First Course</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {course.title}
                      </h3>
                      {course.programs && (
                        <Badge 
                          variant="secondary" 
                          className="mt-2 bg-primary/10 text-primary border-soft hover:bg-primary/20 transition-colors duration-300"
                        >
                          {course.programs.name}
                        </Badge>
                      )}
                      {course.description && (
                        <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
                          {course.description}
                        </p>
                      )}
                    </div>
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
                          Video
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
                          Materials
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                      className="hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                    >
                      <Link href={`/dashboard/instructor/edit-course/${course.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the course and remove it from all
                            students.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCourse(course.id)}
                            disabled={deletingCourse === course.id}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deletingCourse === course.id ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
