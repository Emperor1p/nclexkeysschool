# NCLEX Keys International Website

A comprehensive educational platform for NCLEX exam preparation with student and instructor dashboards.

## Features

### Public Pages
- **Home**: Landing page with hero section, features, testimonials, and stats
- **About**: Information about NCLEX Keys International mission and values
- **Programs**: Display of available NCLEX preparation programs with pricing
- **Services**: Overview of all services offered
- **Resources**: Study materials, video tutorials, and community links
- **Contact**: Contact form and information

### Authentication
- User registration with enrollment token verification
- Login system with role-based redirects
- Payment verification via WhatsApp
- Secure authentication using Supabase

### Student Dashboard
- Course access with video lectures and study materials
- Progress tracking and completion marking
- WhatsApp and Telegram community access
- Performance statistics and analytics
- Payment verification status

### Instructor Dashboard
- Course creation and management
- Upload video links and study materials
- Assign courses to programs
- Edit and delete courses
- View student enrollment statistics

### Database Structure
- Users (students, instructors, admins)
- Programs (NCLEX-RN, NCLEX-PN, Bootcamp)
- Courses (video lectures, materials)
- Enrollments (student-program relationships)
- Enrollment tokens (access control)
- User progress tracking

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. Install dependencies (handled automatically by Next.js)
2. Set up Supabase integration in Project Settings
3. Run the SQL scripts in the `scripts` folder to set up the database
4. Configure environment variables for WhatsApp and Telegram links
5. Start developing!

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Development redirect URL

## External Integrations

- **WhatsApp**: Payment verification and support groups
- **Telegram**: Community channels and updates
- **Video Platforms**: YouTube, Vimeo for course videos
- **File Storage**: Google Drive, Dropbox for study materials

## User Roles

1. **Student**: Access courses, track progress, join communities
2. **Instructor**: Create and manage courses, upload materials
3. **Admin**: Full system access (future implementation)

## Payment Flow

1. Student registers with enrollment token
2. Makes payment via specified method
3. Sends payment screenshot via WhatsApp
4. Admin verifies payment within 24 hours
5. Student gets full access to dashboard and courses

## Support

For support, contact:
- Email: support@nclexkeys.com
- WhatsApp: +1 (555) 123-4567
- Telegram: @nclexkeys
