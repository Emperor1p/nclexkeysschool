import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Lightbulb, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in nursing education and student support.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We care deeply about each student's success and well-being.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously improve our teaching methods and learning materials.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a supportive learning environment for all students.",
    },
  ]

  const boardMembers = [
    {
      name: "Lawal Boluwatife Joseph",
      title: "Registered Nurse (NGN RN, U.S. RN) | Mentor & Career Coach",
      image: "/board 1.jpg",
      bio: "Meet Lawal Boluwatife Joseph, a Compassionate, versatile, dynamic, and results-driven Registered Nurse (NGN RN, U.S. RN) with a strong foundation in nursing careers. Beyond clinical expertise, I serve as a mentor, career coach, and relocation consultant, helping nurses excel in NCLEX preparation, achieve career growth, and navigate international transitions with confidence. Passionate about raising global nursing standards, I combine clinical knowledge, leadership, and coaching skills to empower nurses at every stage of their journey. My mission is to inspire, guide, and support the next generation of healthcare professionals to thrive in diverse practice environments worldwide and also build men who transform nations and territories.",
    },
    {
      name: "Rita Okoro",
      title: "USRN, RN, RM, BNSc. | Coach & Educator",
      image: "/board 2.jpg",
      bio: "Rita Okoro (USRN, RN, RM, BNSc.) boasts over Nine years of professional experience in nursing practice and education. At the Academy, she serves as a coach and educator, playing a pivotal role in developing high quality learning materials that have significantly enhanced students' learning experiences both online and in the classroom. Her teaching philosophy is guided by a learner centred approach, combining professional expertise with practical application, empowering students to build confidence and achieve mastery as they prepare for their licensure examinations. She is deeply committed to advancing nursing education, dedicated to equipping future nurses with the knowledge, skills, and values necessary for professional growth and success in an ever evolving healthcare environment.",
    },
    {
      name: "Oladimeji Ajayi",
      title: "ND, BSc, MSc, NLA, AERM, PM, HRM | HR/Admin Manager",
      image: "/board3.jpg",
      bio: "Oladimeji Ajayi (ND, BSc, MSc, NLA, AERM, PM, HRM) is a seasoned Human Resources Manager excelling in strategy, business development, team management, content development, and project management. Currently, he serves as HR/Admin at NCLEX Keys, leveraging his expertise to drive organizational success. Additionally, Oladimeji works as a Management Services Manager at Paul Esther Consulting, overseeing office operations and conducting training sessions in leadership, management, and communication. He's a certified Project Manager and Enterprise Risk Management Specialist, known for meticulous planning, diligent work ethic, and effective teamwork.",
    },
    {
      name: "Abigail Adamaka OSAYI",
      title: "USRN, BNSC, RN | Passionate Tutor & Mentor",
      image: "/board4.jpg",
      bio: "Meet Abigail Adamaka OSAYI, (USRN, BNSC, RN) a passionate and driven professional. My goal as a tutor is to help students achieve their academic goals and develop a love for learning that will last for a lifetime. Outside of teaching, I enjoy working out and cooking, and I'm always looking for new ways to learn and grow. I specialize in identifying students' learning needs and creating personalised lesson plans that are tailored to their student's needs to help them meet their learning goals. I'm excited to get to know all of you and work together to help you achieve academic success!",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg-morphing overflow-hidden">
          {/* Advanced animated background shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full floating-shape-morphing" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full floating-shape-morphing stagger-2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full floating-shape-morphing stagger-4" />
          
          <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
            <h1 className="text-5xl sm:text-7xl font-black animate-fade-in-up gradient-text text-shadow-strong">
              About NCLEX Keys International
            </h1>
            <p className="text-2xl text-enhanced text-pretty animate-fade-in-up stagger-1 max-w-4xl mx-auto leading-relaxed">
              Empowering nursing students worldwide to achieve their professional goals through comprehensive NCLEX
              preparation.
            </p>
            <div className="flex justify-center animate-bounce-in stagger-3">
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-purple-500/5"></div>
          <div className="mx-auto max-w-5xl space-y-16 relative z-10">
            <div className="group interactive-card p-8 rounded-3xl glass-strong animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 gradient-text-secondary text-shadow">
                Our Mission
              </h2>
              <p className="text-xl text-enhanced leading-relaxed group-hover:text-foreground transition-all duration-500">
                At NCLEX Keys International, our mission is to provide world-class NCLEX preparation that empowers
                nursing students to pass their exams with confidence. We believe that every aspiring nurse deserves
                access to high-quality education and support, regardless of their location or background.
              </p>
            </div>

            <div className="group interactive-card p-8 rounded-3xl glass-strong animate-fade-in-up stagger-1">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 gradient-text-accent text-shadow">
                Our Story
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-all duration-500">
                Founded by experienced nursing educators and healthcare professionals, NCLEX Keys International was born
                from a simple observation: many talented nursing students struggle with NCLEX preparation due to lack of
                comprehensive resources and personalized support.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-500">
                We set out to change that by creating a comprehensive learning platform that combines expert
                instruction, extensive practice materials, and a supportive community. Today, we're proud to have helped
                thousands of students achieve their dreams of becoming licensed nurses.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg overflow-hidden">
          {/* Advanced decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl floating-shape-morphing" />
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl floating-shape-morphing stagger-3" />
          </div>
          
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
                These principles guide everything we do at NCLEX Keys International.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="group card-3d-strong hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 hover:-translate-y-4 border-soft hover:border-glow animate-bounce-in glass-strong"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="pt-10 text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 text-primary mx-auto group-hover:scale-125 transition-all duration-700 group-hover:rotate-12 animate-tilt">
                      <value.icon className="h-10 w-10 group-hover:animate-pulse" />
                    </div>
                    <h3 className="font-black text-2xl group-hover:text-primary transition-all duration-500 gradient-text-secondary">{value.title}</h3>
                    <p className="text-base text-muted-foreground group-hover:text-foreground transition-all duration-500 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-500/5 to-primary/5"></div>
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Board of Directors
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up stagger-1">
                Meet the experienced leaders guiding NCLEX Keys International to excellence in nursing education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {boardMembers.map((member, index) => (
                <Card
                  key={index}
                  className="group card-3d-strong overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 hover:-translate-y-6 border-soft hover:border-glow animate-bounce-in glass-ultra"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-120 group-hover:rotate-3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <CardContent className="pt-8 space-y-4 relative">
                    <div className="text-center space-y-3">
                      <h3 className="font-black text-xl group-hover:text-primary transition-all duration-500 gradient-text-secondary">{member.name}</h3>
                      <p className="text-sm text-primary font-bold bg-gradient-to-r from-primary/20 to-purple-500/20 px-4 py-2 rounded-full inline-block border border-soft">{member.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-500">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 animated-bg-morphing overflow-hidden">
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full floating-shape-morphing blur-3xl" />
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-full floating-shape-morphing blur-3xl stagger-2" />
          
          <div className="mx-auto max-w-5xl relative z-10">
            <div className="text-center space-y-8">
              <h2 className="text-4xl sm:text-6xl font-black gradient-text text-shadow-strong animate-text-reveal">
                Our Expert Team
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed text-center group-hover:text-foreground transition-all duration-500 px-4 max-w-4xl mx-auto animate-fade-in-up stagger-1">
                Our instructors are experienced nursing professionals and educators who are passionate about helping
                students succeed. With decades of combined experience in nursing education and NCLEX preparation, our team
                brings unparalleled expertise to every course we offer.
              </p>
              <div className="flex justify-center animate-bounce-in stagger-3">
                <div className="w-32 h-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
