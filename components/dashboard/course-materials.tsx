"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlayCircle, 
  FileText, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Video, 
  File,
  CheckCircle,
  Clock
} from "lucide-react"

interface CourseMaterialsProps {
  courses: any[]
  userProgress: any[]
}

export function CourseMaterials({ courses, userProgress }: CourseMaterialsProps) {
  const [activeTab, setActiveTab] = useState("videos")

  const isCourseCompleted = (courseId: string) => {
    return userProgress.some((p) => p.course_id === courseId && p.completed)
  }

  const getFileTypeIcon = (url: string) => {
    if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      return <Video className="h-4 w-4" />
    }
    if (url.includes('.pdf')) {
      return <FileText className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  const getFileTypeLabel = (url: string) => {
    if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      return "Video"
    }
    if (url.includes('.pdf')) {
      return "PDF"
    }
    if (url.includes('.doc') || url.includes('.docx')) {
      return "Document"
    }
    return "File"
  }

  const videoCourses = courses.filter(course => course.video_url)
  const materialCourses = courses.filter(course => course.materials_url)

  if (courses.length === 0) {
    return (
      <Card className="border-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Course Materials
          </CardTitle>
          <CardDescription className="text-base">
            No course materials available yet. Please complete your enrollment.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Course Materials
        </CardTitle>
        <CardDescription className="text-base text-enhanced">
          Access your video lectures and downloadable study materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Lectures ({videoCourses.length})
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Study Materials ({materialCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4 mt-6">
            {videoCourses.length === 0 ? (
              <div className="text-center py-8">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No video lectures available yet.</p>
              </div>
            ) : (
              videoCourses.map((course, index) => {
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
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 mt-6">
            {materialCourses.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No study materials available yet.</p>
              </div>
            ) : (
              materialCourses.map((course, index) => {
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
                      {completed ? <CheckCircle className="h-7 w-7" /> : <FileText className="h-7 w-7" />}
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
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getFileTypeLabel(course.materials_url)}
                          </Badge>
                          {completed && (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-soft">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          asChild
                          className="hover:bg-primary/10 hover:border-glow transition-all duration-300"
                        >
                          <a href={course.materials_url} target="_blank" rel="noopener noreferrer">
                            {getFileTypeIcon(course.materials_url)}
                            <span className="ml-2">Download Materials</span>
                            <Download className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
