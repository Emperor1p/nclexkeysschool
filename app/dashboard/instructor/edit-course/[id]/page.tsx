"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function EditCoursePage() {
  const params = useParams()
  const courseId = params.id as string

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    programId: "",
    videoUrl: "",
    materialsUrl: "",
    orderIndex: 0,
  })
  const [programs, setPrograms] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingCourse, setLoadingCourse] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadPrograms()
    loadCourse()
  }, [courseId])

  const loadPrograms = async () => {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase.from("programs").select("*").eq("is_active", true).order("name")
    if (data) setPrograms(data)
  }

  const loadCourse = async () => {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.from("courses").select("*").eq("id", courseId).single()

    if (error || !data) {
      setError("Course not found")
      setLoadingCourse(false)
      return
    }

    setFormData({
      title: data.title,
      description: data.description || "",
      programId: data.program_id,
      videoUrl: data.video_url || "",
      materialsUrl: data.materials_url || "",
      orderIndex: data.order_index || 0,
    })
    setLoadingCourse(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.title || !formData.programId) {
      setError("Title and Program are required")
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabaseBrowserClient()

      const { error: updateError } = await supabase
        .from("courses")
        .update({
          title: formData.title,
          description: formData.description,
          program_id: formData.programId,
          video_url: formData.videoUrl || null,
          materials_url: formData.materialsUrl || null,
          order_index: formData.orderIndex,
        })
        .eq("id", courseId)

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }

      router.push("/dashboard/instructor")
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  if (loadingCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard/instructor">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
            <CardDescription>Update course information and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  placeholder="Introduction to NCLEX-RN"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the course content..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program *</Label>
                <Select
                  value={formData.programId}
                  onValueChange={(value) => setFormData({ ...formData, programId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Link to YouTube, Vimeo, or other video platform</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="materialsUrl">Study Materials URL</Label>
                <Input
                  id="materialsUrl"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={formData.materialsUrl}
                  onChange={(e) => setFormData({ ...formData, materialsUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Link to Google Drive, Dropbox, or other file storage</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderIndex">Order Index</Label>
                <Input
                  id="orderIndex"
                  type="number"
                  placeholder="0"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: Number.parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">Lower numbers appear first in the course list</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
