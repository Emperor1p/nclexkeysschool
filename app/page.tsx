import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, BookOpen, Users, Award, TrendingUp, Clock, Sparkles, Zap, Target } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "Access 100+ video lectures and 2000+ practice questions covering all NCLEX topics.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced nursing educators with proven track records.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "High Pass Rates",
      description: "Our students consistently achieve above-average NCLEX pass rates.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to all course materials.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Proven Methods",
      description: "Evidence-based teaching strategies designed for NCLEX success.",
      gradient: "from-pink-500 to-rose-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "RN, Class of 2024",
      content:
        "NCLEX Keys helped me pass on my first attempt! The practice questions were incredibly similar to the actual exam.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "RN, Class of 2024",
      content: "The instructors are amazing and the content is comprehensive. I felt fully prepared for my NCLEX exam.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "LPN, Class of 2023",
      content: "Best investment I made for my nursing career. The study materials and support were exceptional.",
      avatar: "ER",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 animated-bg opacity-10" />

        {/* Floating shapes */}
        <div className="floating-shape w-72 h-72 bg-blue-500 top-20 -left-20" style={{ animationDelay: "0s" }} />
        <div className="floating-shape w-96 h-96 bg-purple-500 top-40 -right-32" style={{ animationDelay: "2s" }} />
        <div className="floating-shape w-64 h-64 bg-pink-500 bottom-20 left-1/3" style={{ animationDelay: "4s" }} />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-blue-500/20 animate-pulse-glow">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Your Journey to Success Starts Here</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Your Path to{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                    NCLEX Success
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path
                      d="M0 4C50 4 50 4 100 4C150 4 150 4 200 4"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up stagger-1">
              Join thousands of nursing students who have achieved their dreams with our comprehensive NCLEX preparation
              programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in-up stagger-2">
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Link href="/programs">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Programs
                    <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="glass-strong border-2 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 bg-transparent"
              >
                <Link href="/about">
                  <span className="flex items-center gap-2">
                    Learn More
                    <Target className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            {[
              { value: "95%", label: "Pass Rate", delay: "0.3s" },
              { value: "5000+", label: "Students Trained", delay: "0.4s" },
              { value: "100+", label: "Video Lectures", delay: "0.5s" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 animate-scale-in border border-white/10 hover:border-blue-500/30"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NCLEX Keys?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed on your NCLEX exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`card-3d group border-2 hover:border-transparent relative overflow-hidden animate-scale-in stagger-${index + 1}`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="relative">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Student{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our students who have passed their NCLEX exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`glass-strong border border-white/10 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 animate-slide-in-left stagger-${index + 1}`}
              >
                <CardContent className="pt-6 space-y-4">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>

                  <div className="pt-2 border-t border-white/10">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 animated-bg opacity-20" />

        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ready to Start Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground">Join our community of successful nursing professionals today.</p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 text-lg px-10 py-7 animate-pulse-glow"
          >
            <Link href="/register">
              <span className="flex items-center gap-2">
                Get Started Now
                <Sparkles className="h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
