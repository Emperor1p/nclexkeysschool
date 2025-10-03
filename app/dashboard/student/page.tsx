"use client";

import { useState, useEffect } from "react";
import { getStudentCourses, enrollInCourse, getAllCourses } from "@/lib/actions/courses";
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
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  // Load student courses on component mount
  useEffect(() => {
    loadStudentCourses();
    loadAvailableCourses();
  }, []);

  const loadStudentCourses = async () => {
    setLoading(true);
    try {
      const result = await getStudentCourses();
      if (result.success) {
        setEnrollments(result.enrollments);
      } else {
        console.error('Failed to load courses:', result.error);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableCourses = async () => {
    try {
      const result = await getAllCourses();
      if (result.success) {
        setAvailableCourses(result.courses);
      } else {
        console.error('Failed to load available courses:', result.error);
      }
    } catch (error) {
      console.error('Error loading available courses:', error);
    }
  };

  const handleEnrollInCourse = async (courseId: string) => {
    setEnrolling(courseId);
    try {
      const result = await enrollInCourse(courseId);
      if (result.success) {
        // Reload both enrolled and available courses
        await loadStudentCourses();
        await loadAvailableCourses();
        alert('Successfully enrolled in course!');
      } else {
        alert(`Failed to enroll: ${result.error}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Error enrolling in course. Please try again.');
    } finally {
      setEnrolling(null);
    }
  };

  const stats = [
    {
      title: "Courses Enrolled",
      value: enrollments.length.toString(),
      icon: BookOpen,
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Completion Rate",
      value: `${Math.round(enrollments.reduce((total, enrollment) => total + enrollment.progress_percentage, 0) / (enrollments.length || 1))}%`,
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
      value: enrollments.filter(e => e.status === 'completed').length.toString(),
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">My Courses</TabsTrigger>
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="materials">Course Materials</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="overview" className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-[#9faeed] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading courses...</p>
              </div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses enrolled</h3>
                <p className="text-gray-600 mb-4">Enroll in courses to start learning</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="border-soft hover:border-glow transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{enrollment.courses.title}</CardTitle>
                          <CardDescription className="mt-1">
                            by {enrollment.courses.users?.full_name || 'Instructor'}
                          </CardDescription>
                          <p className="text-sm text-gray-600 mt-2">{enrollment.courses.description}</p>
                        </div>
                        <Badge 
                          variant={enrollment.status === 'active' ? 'default' : 'secondary'}
                          className={enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {enrollment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Progress</span>
                          <span>{enrollment.progress_percentage}%</span>
                        </div>
                        <Progress value={enrollment.progress_percentage} className="w-full" />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {enrollment.courses.duration}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                            onClick={() => {
                              setSelectedCourse(enrollment);
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
            )}
          </TabsContent>

          {/* Browse Courses Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
              <p className="text-gray-600">Discover and enroll in new courses</p>
            </div>

            {availableCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses available</h3>
                <p className="text-gray-600">Check back later for new courses</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableCourses.map((course) => {
                  const isEnrolled = enrollments.some(e => e.course_id === course.id);
                  const isEnrolling = enrolling === course.id;
                  
                  return (
                    <Card key={course.id} className="border-soft hover:border-glow transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <CardDescription className="mt-1">
                              by {course.users?.full_name || 'Instructor'}
                            </CardDescription>
                            <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                          </div>
                          <Badge 
                            variant={isEnrolled ? 'default' : 'secondary'}
                            className={isEnrolled ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                          >
                            {isEnrolled ? 'Enrolled' : 'Available'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {course.duration}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Award className="w-4 h-4 mr-2" />
                              {course.price}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen className="w-4 h-4 mr-2" />
                            {course.course_materials?.length || 0} materials
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Created {new Date(course.created_at).toLocaleDateString()}
                          </div>
                          
                          <div className="flex gap-2">
                            {isEnrolled ? (
                              <Button 
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => {
                                  setSelectedCourse(enrollments.find(e => e.course_id === course.id));
                                  setActiveTab('materials');
                                }}
                              >
                                Continue Learning
                              </Button>
                            ) : (
                              <Button 
                                className="flex-1 bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
                                onClick={() => handleEnrollInCourse(course.id)}
                                disabled={isEnrolling}
                              >
                                {isEnrolling ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Enrolling...
                                  </div>
                                ) : (
                                  'Enroll Now'
                                )}
                              </Button>
                            )}
                            <Button variant="outline" className="border-soft hover:border-glow">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
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
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.courses.title}</h2>
                    <p className="text-gray-600">by {selectedCourse.courses.users?.full_name || 'Instructor'}</p>
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
                        <span className="font-semibold">{selectedCourse.progress_percentage}%</span>
                      </div>
                      <Progress value={selectedCourse.progress_percentage} className="w-full" />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{selectedCourse.courses.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Materials:</span>
                          <span>{selectedCourse.courses.course_materials?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span>{selectedCourse.material_progress?.filter(m => m.completed).length || 0}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Materials List */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Course Materials</h3>
                    {selectedCourse.courses.course_materials?.map((material: any, index: number) => (
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
