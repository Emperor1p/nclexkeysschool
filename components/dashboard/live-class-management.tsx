"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  createLiveClassLink, 
  updateLiveClassLink, 
  deleteLiveClassLink 
} from "@/lib/actions/live-class-links"
import { 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface LiveClassManagementProps {
  links: any[]
}

export function LiveClassManagement({ links: initialLinks }: LiveClassManagementProps) {
  const [links, setLinks] = useState(initialLinks)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link_url: "",
    meeting_platform: "zoom",
    scheduled_time: "",
    duration: "",
    is_active: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await createLiveClassLink(formData)
      
      if (result.success) {
        setSuccess("Live class link created successfully!")
        setShowDialog(false)
        setFormData({
          title: "",
          description: "",
          link_url: "",
          meeting_platform: "zoom",
          scheduled_time: "",
          duration: "",
          is_active: true
        })
        // Refresh the page to show new link
        window.location.reload()
      } else {
        setError(result.error || "Failed to create live class link")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this live class link?")) {
      return
    }

    try {
      const result = await deleteLiveClassLink(linkId)
      if (result.success) {
        setLinks(links.filter(l => l.id !== linkId))
        setSuccess("Live class link deleted successfully!")
      } else {
        setError(result.error || "Failed to delete link")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  const handleToggleActive = async (linkId: string, currentStatus: boolean) => {
    try {
      const result = await updateLiveClassLink(linkId, { is_active: !currentStatus })
      if (result.success) {
        setLinks(links.map(l => l.id === linkId ? { ...l, is_active: !currentStatus } : l))
        setSuccess(`Live class link ${!currentStatus ? 'activated' : 'deactivated'} successfully!`)
      } else {
        setError(result.error || "Failed to update link")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Not scheduled'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Video className="h-6 w-6 text-primary" />
              Live Class Links
            </CardTitle>
            <CardDescription className="text-base text-enhanced mt-2">
              Manage Zoom/video call links for your students
            </CardDescription>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Live Class Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Live Class Link</DialogTitle>
                <DialogDescription>
                  Add a Zoom, Google Meet, or Teams link for your students to join live classes
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Class Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Weekly Q&A Session, Live Lecture on Pharmacology"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of what will be covered in this session"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="link_url">Meeting Link *</Label>
                  <Input
                    id="link_url"
                    type="url"
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="meeting_platform">Platform *</Label>
                  <select
                    id="meeting_platform"
                    value={formData.meeting_platform}
                    onChange={(e) => setFormData({ ...formData, meeting_platform: e.target.value })}
                    className="w-full px-3 py-2 border border-soft rounded-md bg-white"
                    required
                  >
                    <option value="zoom">Zoom</option>
                    <option value="google-meet">Google Meet</option>
                    <option value="microsoft-teams">Microsoft Teams</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduled_time">Scheduled Date & Time</Label>
                    <Input
                      id="scheduled_time"
                      type="datetime-local"
                      value={formData.scheduled_time}
                      onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 1 hour, 45 mins"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3 justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowDialog(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                  >
                    {loading ? "Creating..." : "Create Link"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 border-green-500/30 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {links.length === 0 ? (
          <div className="text-center py-12">
            <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No live class links yet</p>
            <p className="text-sm text-gray-500">Create your first live class link to connect with your students</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link, index) => (
              <div
                key={link.id}
                className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0 bg-gradient-to-br from-primary/20 to-purple-500/20 text-3xl">
                  🎥
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{link.title}</h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={link.is_active ? "default" : "secondary"}
                        className={link.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {link.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {link.meeting_platform}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                    {link.scheduled_time && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDateTime(link.scheduled_time)}</span>
                      </div>
                    )}
                    {link.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{link.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                      className="hover:bg-primary/10 hover:border-glow"
                    >
                      <a href={link.link_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Link
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant={link.is_active ? "outline" : "default"}
                      onClick={() => handleToggleActive(link.id, link.is_active)}
                      className={!link.is_active ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                    >
                      {link.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(link.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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
