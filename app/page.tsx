"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, BookOpen, Users, Award, TrendingUp, Clock, Sparkles, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const [currentTestimony, setCurrentTestimony] = useState(0)
  
  const testimonyImages = [
    "/testimony1.jpg",
    "/testimony2.jpg", 
    "/testimony3.jpg",
    "/testimony4.jpg",
    "/testimony5.jpg",
    "/testimony6.jpg"
  ]

  // Auto-rotate testimonies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimony((prev) => (prev + 1) % testimonyImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonyImages.length])

  const nextTestimony = () => {
    setCurrentTestimony((prev) => (prev + 1) % testimonyImages.length)
  }

  const prevTestimony = () => {
    setCurrentTestimony((prev) => (prev - 1 + testimonyImages.length) % testimonyImages.length)
  }

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "Access 100+ video lectures and 2000+ practice questions covering all NCLEX topics.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced nursing educators with proven track records.",
    },
    {
      icon: Award,
      title: "High Pass Rates",
      description: "Our students consistently achieve above-average NCLEX pass rates.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights.",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to all course materials.",
    },
    {
      icon: CheckCircle,
      title: "Proven Methods",
      description: "Evidence-based teaching strategies designed for NCLEX success.",
    },
  ]


  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Floating shapes */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "4s" }} />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">Your Journey to Success Starts Here</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Your Path to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">NCLEX Success</span>
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/programs">
                  <span className="flex items-center gap-2">
                    Explore Programs
                    <Zap className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-gray-300 hover:border-purple-600 bg-white hover:bg-purple-50 text-gray-900 text-lg px-8 py-6 transition-all"
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
              { value: "95%", label: "Pass Rate", color: "from-blue-50 to-blue-100", textColor: "text-blue-600" },
              { value: "5000+", label: "Students Trained", color: "from-purple-50 to-purple-100", textColor: "text-purple-600" },
              { value: "100+", label: "Video Lectures", color: "from-pink-50 to-pink-100", textColor: "text-pink-600" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 text-center bg-gradient-to-br ${stat.color} border border-white shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className={`text-5xl font-bold ${stat.textColor} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Why Choose NCLEX Keys?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed on your NCLEX exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our students who have passed their NCLEX exams.
            </p>
          </div>

          {/* Testimony Carousel */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {/* Main testimony image */}
              <div className="relative aspect-[4/3] w-full max-h-80">
                <Image
                  src={testimonyImages[currentTestimony]}
                  alt={`Student testimony ${currentTestimony + 1}`}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                  priority
                />
                
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation arrows */}
                <button
                  onClick={prevTestimony}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimony"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                
                <button
                  onClick={nextTestimony}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                  aria-label="Next testimony"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimony(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimony
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                />
              ))}
            </div>

            {/* Testimony counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                {currentTestimony + 1} of {testimonyImages.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground">Join our community of successful nursing professionals today.</p>
          <Button
            size="lg"
            asChild
            className="text-lg px-10 py-7"
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
