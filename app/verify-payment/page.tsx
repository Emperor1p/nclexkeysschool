"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { CheckCircle, AlertCircle, MessageCircle, ExternalLink } from "lucide-react"

export default function VerifyPaymentPage() {
  const [enrollment, setEnrollment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadEnrollment()
  }, [])

  const loadEnrollment = async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from("enrollments")
        .select("*, programs(*)")
        .eq("user_id", user.id)
        .order("enrolled_at", { ascending: false })
        .limit(1)
        .single()

      if (error) {
        console.error("[v0] Error loading enrollment:", error)
        setLoading(false)
        return
      }

      setEnrollment(data)
      setLoading(false)

      // If payment is already verified, redirect to dashboard
      if (data.payment_verified) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("[v0] Error:", err)
      setLoading(false)
    }
  }

  const whatsappNumber = "+15551234567" // Replace with actual WhatsApp number
  const whatsappMessage = enrollment
    ? `Hi, I just registered for ${enrollment.programs.name}. Here is my payment screenshot.`
    : "Hi, I just registered for a program."

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Verification Required</CardTitle>
          <CardDescription>Complete your enrollment by verifying your payment via WhatsApp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {enrollment && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                You've successfully registered for <strong>{enrollment.programs.name}</strong>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Next Steps:</h3>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Make Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Transfer ${enrollment?.programs.price} to our payment account
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Take Screenshot</p>
                  <p className="text-sm text-muted-foreground">Capture a screenshot of your payment confirmation</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Send via WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    Click the button below to send your payment screenshot to our WhatsApp
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium">Get Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Our team will verify your payment within 24 hours and activate your account
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <Alert className="bg-primary/5 border-primary/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              After payment verification, you'll receive full access to your dashboard and all course materials.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={handleWhatsAppClick}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Send Payment Screenshot via WhatsApp
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Having trouble? Contact us at support@nclexkeys.com
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
