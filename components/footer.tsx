import Link from "next/link"
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 border-t-2 border-purple-200 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-20 w-64 h-64 bg-indigo-400/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-pink-400/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4 group">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                <GraduationCap className="h-7 w-7" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                NCLEX Keys
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300 font-semibold">
              Empowering nursing students to achieve their dreams through comprehensive NCLEX preparation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Programs
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-foreground hover:text-primary transition-colors duration-300 cursor-pointer font-bold">
                ✓ NCLEX-RN Review
              </li>
              <li className="text-sm text-foreground hover:text-primary transition-colors duration-300 cursor-pointer font-bold">
                ✓ NCLEX-PN Essentials
              </li>
              <li className="text-sm text-foreground hover:text-primary transition-colors duration-300 cursor-pointer font-bold">
                ✓ NCLEX Bootcamp
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-foreground hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-purple-600">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:nclexkeysintl.academy@gmail.com" className="hover:text-purple-600 transition-colors duration-300">
                  nclexkeysintl.academy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-purple-600">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-purple-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Ikorodu, Lagos, Nigeria</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="mt-6">
            <h4 className="font-black text-base mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Follow Us
            </h4>
              <div className="flex gap-3">
                <a 
                  href="mailto:nclexkeysintl.academy@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Email Us"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/nclexkeys?t=4GfZzurcLrtZ0fzY4oL3AA&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Follow us on X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/groups/14597271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Join our LinkedIn Group"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/share/1FJJwajxh7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-soft text-center">
          <p className="text-sm text-foreground hover:text-primary transition-colors duration-300 font-bold">
            &copy; {new Date().getFullYear()} <span className="font-black">NCLEX Keys International</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
