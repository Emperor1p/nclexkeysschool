import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, ExternalLink, BookOpen, Users } from "lucide-react"

export function ExternalLinks() {
  const whatsappLink = "https://chat.whatsapp.com/ElcEioKKFbcH0DLccfjyaH?mode=ems_copy_t"
  const telegramLink = "https://t.me/+pfkI-HSjx0UzMGQ0"
  const speedExamLink = "https://candidate.speedexam.net/openquiz.aspx?quiz=68A6BFA31A094327AA1ABD93DD8250DF"

  return (
    <Card className="border-soft hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Community & Resources
        </CardTitle>
        <CardDescription className="text-base">
          Join our study groups, get support from instructors, and access practice exams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* WhatsApp Group */}
          <Button variant="outline" className="h-auto py-4 justify-start bg-transparent hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-300 group" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3 w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-green-600 group-hover:text-green-700">WhatsApp Group</div>
                  <div className="text-xs text-muted-foreground">24/7 support & discussions</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-green-600" />
              </div>
            </a>
          </Button>

          {/* Telegram Channel */}
          <Button variant="outline" className="h-auto py-4 justify-start bg-transparent hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-300 group" asChild>
            <a href={telegramLink} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3 w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Send className="h-5 w-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-blue-600 group-hover:text-blue-700">Telegram Channel</div>
                  <div className="text-xs text-muted-foreground">Updates & resources</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600" />
              </div>
            </a>
          </Button>

          {/* SpeedExam Practice */}
          <Button variant="outline" className="h-auto py-4 justify-start bg-transparent hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 group" asChild>
            <a href={speedExamLink} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3 w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-purple-600 group-hover:text-purple-700">SpeedExam Practice</div>
                  <div className="text-xs text-muted-foreground">Practice tests & assessments</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-purple-600" />
              </div>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
