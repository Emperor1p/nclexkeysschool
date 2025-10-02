export type UserRole = "student" | "instructor" | "admin"

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone_number?: string
  created_at: string
}

export interface Program {
  id: string
  name: string
  description: string
  price: number
  duration: string
  features: string[]
  is_active: boolean
  created_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  program_id: string
  status: "pending" | "active" | "completed" | "cancelled"
  payment_verified: boolean
  whatsapp_screenshot_url?: string
  enrolled_at: string
}

export interface Course {
  id: string
  program_id: string
  title: string
  description?: string
  video_url?: string
  materials_url?: string
  order_index?: number
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  course_id: string
  completed: boolean
  last_accessed: string
}
