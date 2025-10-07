"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Video, 
  ExternalLink, 
  Clock, 
  Calendar,
  Users
} from "lucide-react"

interface LiveClassLinksProps {
  links: any[]
}

export function LiveClassLinks({ links }: LiveClassLinksProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'zoom':
        return '🎥'
      case 'google-meet':
      case 'google meet':
        return '📹'
      case 'teams':
      case 'microsoft teams':
        return '👥'
      default:
        return '🔗'
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

  const isUpcoming = (dateString: string) => {
    if (!dateString) return false
    return new Date(dateString) > new Date()
  }

  if (links.length === 0) {
    return (
      <Card className="border-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Live Classes
          </CardTitle>
          <CardDescription className="text-base">
            No live classes scheduled yet. Check back soon!
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <Video className="h-6 w-6" />
          Live Classes
        </CardTitle>
        <CardDescription className="text-base text-enhanced">
          Join live video sessions with your instructor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link, index) => {
            const upcoming = isUpcoming(link.scheduled_time)
            return (
              <div
                key={link.id}
                className="group flex items-start gap-4 p-5 rounded-xl border border-soft hover:border-glow hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl shrink-0 transition-all duration-500 group-hover:scale-110 ${
                    upcoming 
                      ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-3xl" 
                      : "bg-gradient-to-br from-primary/20 to-purple-500/20 text-3xl"
                  }`}
                >
                  {getPlatformIcon(link.meeting_platform)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-enhanced mt-2 group-hover:text-foreground transition-colors duration-300">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {upcoming && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-soft">
                          Upcoming
                        </Badge>
                      )}
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
                      variant="default" 
                      asChild
                      className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                    >
                      <a href={link.link_url} target="_blank" rel="noopener noreferrer">
                        <Video className="h-4 w-4 mr-2" />
                        Join Class
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
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
