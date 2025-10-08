"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { GraduationCap, AlertCircle, Eye, EyeOff, User, Mail, Phone, Key, Shield, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    enrollmentToken: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    if (!formData.enrollmentToken) {
      setError("Enrollment token is required")
      setLoading(false)
      return
    }

    try {
      const supabase = getSupabaseBrowserClient()

      // Verify enrollment token
      const { data: tokenData, error: tokenError } = await supabase
        .from("enrollment_tokens")
        .select("*, programs(*)")
        .eq("token", formData.enrollmentToken)
        .eq("is_used", false)
        .single()

      if (tokenError || !tokenData) {
        setError("Invalid or already used enrollment token")
        setLoading(false)
        return
      }

      // Create auth user (trigger will automatically create profile in users table)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (!authData.user) {
        setError("Failed to create account")
        setLoading(false)
        return
      }

      // User profile is automatically created by database trigger
      // Wait a moment for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create enrollment using admin client (bypasses RLS)
      try {
        const adminClient = getSupabaseAdminClient()
        const { error: enrollmentError } = await adminClient.from("enrollments").insert({
          user_id: authData.user.id,
          program_id: tokenData.program_id,
          status: "pending",
          payment_verified: false,
        })

        if (enrollmentError) {
          console.log("Enrollment error:", enrollmentError)
          setSuccess("Account created successfully! Please contact admin to complete enrollment setup.")
          setLoading(false)
          return
        }
      } catch (err) {
        console.log("Enrollment creation failed:", err)
        // If admin client fails, try with regular client as fallback
        try {
          const { error: enrollmentError } = await supabase.from("enrollments").insert({
            user_id: authData.user.id,
            program_id: tokenData.program_id,
            status: "pending",
            payment_verified: false,
          })

          if (enrollmentError) {
            console.log("Regular enrollment error:", enrollmentError)
            setSuccess("Account created successfully! Please contact admin to complete enrollment setup.")
            setLoading(false)
            return
          }
        } catch (regularErr) {
          console.log("Regular enrollment creation failed:", regularErr)
          setSuccess("Account created successfully! Please contact admin to complete enrollment setup.")
          setLoading(false)
          return
        }
      }

      // Mark token as used
      await supabase
        .from("enrollment_tokens")
        .update({
          is_used: true,
          used_by: authData.user.id,
          used_at: new Date().toISOString(),
        })
        .eq("id", tokenData.id)

      // Show success message
      setSuccess("Account created successfully! Redirecting to payment verification...")
      setLoading(false)
      
      // Redirect to payment verification after a short delay
      setTimeout(() => {
        router.push("/verify-payment")
      }, 2000)
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-purple-200 bg-white">
        <CardHeader className="space-y-6 pb-6">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-base text-gray-600">Join NCLEX Keys International and start your journey</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {error && (
              <Alert variant="destructive" className="border-red-500/50 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="fullName" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4 text-purple-600" />
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-11 pl-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="name"
                  style={{ pointerEvents: 'auto' }}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4 text-purple-600" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11 pl-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="email"
                  style={{ pointerEvents: 'auto' }}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="phoneNumber" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4 text-purple-600" />
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="h-11 pl-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="tel"
                  style={{ pointerEvents: 'auto' }}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="password" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <Shield className="h-4 w-4 text-purple-600" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-11 pl-10 pr-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="new-password"
                  style={{ pointerEvents: 'auto' }}
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200 z-20"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <Shield className="h-4 w-4 text-purple-600" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-11 pl-10 pr-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="new-password"
                  style={{ pointerEvents: 'auto' }}
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200 z-20"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="enrollmentToken" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                <Key className="h-4 w-4 text-purple-600" />
                Enrollment Token
              </Label>
              <div className="relative">
                <Input
                  id="enrollmentToken"
                  type="text"
                  placeholder="Enter your enrollment token"
                  value={formData.enrollmentToken}
                  onChange={(e) => setFormData({ ...formData, enrollmentToken: e.target.value })}
                  className="h-11 pl-10 border-2 border-gray-300 bg-white focus:border-purple-500 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 relative z-10"
                  required
                  autoComplete="off"
                  style={{ pointerEvents: 'auto' }}
                />
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                <Shield className="h-3 w-3" />
                You'll receive this token after payment verification via WhatsApp
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-purple-600 hover:text-pink-600 font-semibold hover:underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
