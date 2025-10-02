import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full floating-shape blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full floating-shape stagger-2 blur-3xl" />
          
          <div className="mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold animate-fade-in-up bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground text-pretty animate-fade-in-up stagger-1">
              Have questions? We're here to help you on your NCLEX journey.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-primary/20 animate-slide-in-left">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5">
                    <div className="space-y-2 group/input">
                      <label htmlFor="name" className="text-sm font-semibold">
                        Full Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="John Doe"
                        className="h-11 transition-all duration-300 focus:scale-[1.02] border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label htmlFor="email" className="text-sm font-semibold">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com"
                        className="h-11 transition-all duration-300 focus:scale-[1.02] border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number (Optional)
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1 (555) 123-4567"
                        className="h-11 transition-all duration-300 focus:scale-[1.02] border-primary/20 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label htmlFor="message" className="text-sm font-semibold">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..." 
                        rows={5}
                        className="transition-all duration-300 focus:scale-[1.02] border-primary/20 focus:border-primary/50 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6 animate-slide-in-right">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-primary/20 animate-fade-in stagger-1">
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Email</h3>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">info@nclexkeys.com</p>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">support@nclexkeys.com</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-primary/20 animate-fade-in stagger-2">
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-primary/20 text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Phone</h3>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">+1 (555) 123-4567</p>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Mon-Fri: 9AM - 6PM EST</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-primary/20 animate-fade-in stagger-3">
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <MessageCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">WhatsApp</h3>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">+1 (555) 123-4567</p>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">24/7 Support Available</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-primary/20 animate-fade-in stagger-4">
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-primary/20 text-primary shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">Location</h3>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Serving Students Worldwide</p>
                          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">International Support</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/5 border-primary/30 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] animate-fade-in stagger-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                  <CardContent className="pt-6 relative z-10">
                    <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Quick Response
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For immediate assistance, reach out via WhatsApp. Our support team is available 24/7 to answer
                      your questions about programs, enrollment, and payment verification.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
