import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, FileText, MessageCircle, BarChart, Headphones, Calendar } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Video,
      title: "Video Lectures",
      description: "High-quality video lectures covering all NCLEX topics with expert instructors.",
      features: ["HD video quality", "Downloadable content", "Mobile-friendly", "Lifetime access"],
    },
    {
      icon: FileText,
      title: "Practice Questions",
      description: "Thousands of NCLEX-style practice questions with detailed explanations.",
      features: ["2000+ questions", "Detailed rationales", "Performance tracking", "Timed practice tests"],
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Direct access to instructors and study groups via WhatsApp.",
      features: ["24/7 support", "Study groups", "Quick responses", "Community access"],
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Comprehensive analytics to monitor your learning progress.",
      features: ["Performance metrics", "Weak area identification", "Study recommendations", "Goal setting"],
    },
    {
      icon: Headphones,
      title: "One-on-One Coaching",
      description: "Personalized coaching sessions with experienced nursing educators.",
      features: ["Individual attention", "Custom study plans", "Exam strategies", "Confidence building"],
    },
    {
      icon: Calendar,
      title: "Study Schedules",
      description: "Customized study schedules tailored to your exam date and learning pace.",
      features: ["Personalized plans", "Flexible scheduling", "Reminder system", "Progress milestones"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">Our Services</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Comprehensive NCLEX preparation services designed to help you succeed on your first attempt.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border-soft hover:border-glow transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">All-Inclusive Learning Experience</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When you enroll in any of our programs, you get access to all these services and more. We're committed
                to providing you with everything you need to pass your NCLEX exam with confidence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
