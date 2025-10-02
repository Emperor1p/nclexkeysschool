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
import { GraduationCap, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      console.log("Attempting login with:", formData.email)
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      console.log("Login response:", { data, authError })

      if (authError) {
        console.error("Login error:", authError)
        setError(authError.message)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError("Failed to login")
        setLoading(false)
        return
      }

      // Get user role
      const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()

      // Redirect based on role
      if (userData?.role === "instructor") {
        router.push("/dashboard/instructor")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-soft">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base">Login to access your NCLEX preparation dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-fade-in border-red-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 border-soft bg-background"
                required
              />
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-11 border-soft bg-background"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register" className="text-primary hover:text-purple-600 font-semibold hover:underline">
                Register
              </Link>
            </div>
            
            {/* Debug info - remove this after testing */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <strong>Debug Info:</strong><br/>
              Email: {formData.email}<br/>
              Password length: {formData.password.length}<br/>
              <button 
                type="button" 
                onClick={() => {
                  console.log("Form data:", formData);
                  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
                }}
                className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
              >
                Log Form Data
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
