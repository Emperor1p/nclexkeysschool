"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Image, 
  Play, 
  Download,
  Clock,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";

interface CourseMaterial {
  id: string;
  type: 'video' | 'pdf' | 'slides';
  title: string;
  description: string;
  duration?: string;
  completed: boolean;
  url?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  duration: string;
  price: string;
  materials: CourseMaterial[];
  lastAccessed: string;
  status: 'active' | 'completed' | 'paused';
}

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: "NCLEX-RN Comprehensive Review",
      description: "Complete review of NCLEX-RN exam topics with practice questions",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      duration: "12 weeks",
      price: "$299",
      lastAccessed: "2 hours ago",
      status: 'active',
      materials: [
        {
          id: 1,
          type: 'video',
          title: 'Introduction to NCLEX-RN',
          description: 'Overview of the NCLEX-RN exam structure and format',
          duration: '45 min',
          completed: true,
          url: '/sample-video.mp4'
        },
        {
          id: 2,
          type: 'video',
          title: 'Medical-Surgical Nursing Fundamentals',
          description: 'Core concepts in medical-surgical nursing',
          duration: '60 min',
          completed: true,
          url: '/sample-video2.mp4'
        },
        {
          id: 3,
          type: 'pdf',
          title: 'Pharmacology Study Guide',
          description: 'Comprehensive guide to nursing pharmacology',
          duration: '30 min',
          completed: false,
          url: '/sample-pharmacology.pdf'
        },
        {
          id: 4,
          type: 'slides',
          title: 'Critical Thinking in Nursing',
          description: 'Developing critical thinking skills for NCLEX',
          duration: '40 min',
          completed: false,
          url: '/sample-slides.pdf'
        }
      ]
    },
    {
      id: 2,
      title: "Pharmacology Fundamentals",
      description: "Essential pharmacology concepts for nursing practice",
      instructor: "Prof. Michael Chen",
      progress: 60,
      duration: "8 weeks",
      price: "$199",
      lastAccessed: "1 day ago",
      status: 'active',
      materials: [
        {
          id: 5,
          type: 'video',
          title: 'Drug Classifications',
          description: 'Understanding different drug categories',
          duration: '50 min',
          completed: true,
          url: '/sample-video3.mp4'
        },
        {
          id: 6,
          type: 'pdf',
          title: 'Medication Administration',
          description: 'Safe medication administration practices',
          duration: '25 min',
          completed: false,
          url: '/sample-medication.pdf'
        }
      ]
    }
  ];

  const stats = [
    {
      title: "Courses Enrolled",
      value: courses.length.toString(),
      icon: BookOpen,
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Completion Rate",
      value: "68%",
      icon: TrendingUp,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Study Hours",
      value: "24.5h",
      icon: Clock,
      change: "+3.2h",
      changeType: "positive"
    },
    {
      title: "Certificates",
      value: "1",
      icon: Award,
      change: "+1",
      changeType: "positive"
    }
  ];

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'slides': return <Image className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMaterialAction = (material: CourseMaterial) => {
    switch (material.type) {
      case 'video':
        return (
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
            <Play className="w-4 h-4 mr-2" />
            Watch
          </Button>
        );
      case 'pdf':
        return (
          <Button size="sm" variant="outline" className="border-soft hover:border-glow">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        );
      case 'slides':
        return (
          <Button size="sm" variant="outline" className="border-soft hover:border-glow">
            <Download className="w-4 h-4 mr-2" />
            View
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#9faeed] to-[#6daedb] rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Overall Progress</div>
                <div className="text-2xl font-bold text-gray-900">68%</div>
              </div>
              <div className="w-16 h-16">
                <Progress value={68} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-soft hover:border-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-[#9faeed] to-[#6daedb] rounded-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">My Courses</TabsTrigger>
            <TabsTrigger value="materials">Course Materials</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-soft hover:border-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-1">
                          by {course.instructor}
                        </CardDescription>
                        <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                      </div>
                      <Badge 
                        variant={course.status === 'active' ? 'default' : 'secondary'}
                        className={course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="w-full" />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {course.duration}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Last: {course.lastAccessed}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                          onClick={() => {
                            setSelectedCourse(course);
                            setActiveTab('materials');
                          }}
                        >
                          Continue Learning
                        </Button>
                        <Button variant="outline" className="border-soft hover:border-glow">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Course Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            {selectedCourse ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('overview')}
                    className="flex items-center gap-2"
                  >
                    ← Back to Courses
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                    <p className="text-gray-600">by {selectedCourse.instructor}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Course Info */}
                  <Card className="border-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">Course Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="font-semibold">{selectedCourse.progress}%</span>
                      </div>
                      <Progress value={selectedCourse.progress} className="w-full" />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{selectedCourse.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Materials:</span>
                          <span>{selectedCourse.materials.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span>{selectedCourse.materials.filter(m => m.completed).length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Materials List */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Course Materials</h3>
                    {selectedCourse.materials.map((material, index) => (
                      <Card key={material.id} className="border-soft hover:border-glow transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                {getMaterialIcon(material.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900">{material.title}</h4>
                                  {material.completed && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {material.duration}
                                  </span>
                                  <Badge 
                                    variant={material.completed ? 'default' : 'secondary'}
                                    className={material.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                  >
                                    {material.completed ? 'Completed' : 'Pending'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {getMaterialAction(material)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Course Selected</h3>
                <p className="text-gray-600 mb-4">Select a course from "My Courses" to view materials</p>
                <Button 
                  onClick={() => setActiveTab('overview')}
                  className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                >
                  View My Courses
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
