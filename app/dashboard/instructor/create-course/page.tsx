"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/ui/file-upload"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, AlertCircle, Upload, Link as LinkIcon, FileText, Video } from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    programId: "",
    videoUrl: "",
    materialsUrl: "",
    orderIndex: 0,
  })
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null)
  const [uploadedMaterialsUrl, setUploadedMaterialsUrl] = useState<string | null>(null)
  const [programs, setPrograms] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase.from("programs").select("*").eq("is_active", true).order("name")
    if (data) setPrograms(data)
  }

  const handleVideoUpload = async (file: File): Promise<string> => {
    // For now, we'll simulate file upload by creating a temporary URL
    // In a real implementation, you would upload to a service like AWS S3, Cloudinary, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        resolve(url)
      }, 1000)
    })
  }

  const handleMaterialsUpload = async (file: File): Promise<string> => {
    // For now, we'll simulate file upload by creating a temporary URL
    // In a real implementation, you would upload to a service like AWS S3, Cloudinary, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file)
        resolve(url)
      }, 1000)
    })
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
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in")
        setLoading(false)
        return
      }

      const { error: insertError } = await supabase.from("courses").insert({
        title: formData.title,
        description: formData.description,
        program_id: formData.programId,
        video_url: uploadedVideoUrl || formData.videoUrl || null,
        materials_url: uploadedMaterialsUrl || formData.materialsUrl || null,
        order_index: formData.orderIndex,
        created_by: user.id,
      })

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }

      router.push("/dashboard/instructor")
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
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
            <CardTitle>Create New Course</CardTitle>
            <CardDescription>Add a new course to your program</CardDescription>
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

              <div className="space-y-4">
                <Label>Video Content</Label>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Video
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Video Link
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="space-y-2">
                    <FileUpload
                      onUpload={handleVideoUpload}
                      accept="video/*"
                      maxSize={500}
                      className="w-full"
                    />
                    {uploadedVideoUrl && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">Video uploaded successfully!</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="link" className="space-y-2">
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Link to YouTube, Vimeo, or other video platform</p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <Label>Study Materials</Label>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Files
                    </TabsTrigger>
                    <TabsTrigger value="link" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      File Link
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="space-y-2">
                    <FileUpload
                      onUpload={handleMaterialsUpload}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                      maxSize={100}
                      className="w-full"
                    />
                    {uploadedMaterialsUrl && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">Materials uploaded successfully!</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="link" className="space-y-2">
                    <Input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={formData.materialsUrl}
                      onChange={(e) => setFormData({ ...formData, materialsUrl: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Link to Google Drive, Dropbox, or other file storage</p>
                  </TabsContent>
                </Tabs>
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
                  {loading ? "Creating..." : "Create Course"}
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
