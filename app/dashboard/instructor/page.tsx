"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  GraduationCap,
  TrendingUp,
  Clock,
  Award,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  MessageSquare,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "NCLEX-RN Comprehensive Review",
      students: 45,
      status: "active",
      lastUpdated: "2 days ago",
      description: "Complete review of NCLEX-RN exam topics",
      duration: "12 weeks",
      price: "$299"
    },
    {
      id: 2,
      title: "Pharmacology Fundamentals",
      students: 32,
      status: "active", 
      lastUpdated: "1 week ago",
      description: "Essential pharmacology concepts for nursing",
      duration: "8 weeks",
      price: "$199"
    },
    {
      id: 3,
      title: "Medical-Surgical Nursing",
      students: 28,
      status: "draft",
      lastUpdated: "3 days ago",
      description: "Advanced medical-surgical nursing concepts",
      duration: "10 weeks",
      price: "$249"
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      course: "NCLEX-RN Comprehensive Review",
      progress: 75,
      lastActive: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      course: "Pharmacology Fundamentals",
      progress: 60,
      lastActive: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      course: "Medical-Surgical Nursing",
      progress: 90,
      lastActive: "3 hours ago",
      status: "active"
    }
  ]);

  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: ""
  });

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Courses",
      value: courses.filter(c => c.status === "active").length.toString(),
      icon: BookOpen,
      change: "+1",
      changeType: "positive"
    },
    {
      title: "Completion Rate",
      value: "87%",
      icon: TrendingUp,
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Avg. Study Time",
      value: "4.2h",
      icon: Clock,
      change: "+0.3h",
      changeType: "positive"
    }
  ];

  // Filter courses based on search and status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle course creation
  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course = {
        id: courses.length + 1,
        title: newCourse.title,
        students: 0,
        status: "draft",
        lastUpdated: "Just now",
        description: newCourse.description,
        duration: newCourse.duration,
        price: newCourse.price
      };
      setCourses([...courses, course]);
      setNewCourse({ title: "", description: "", duration: "", price: "" });
      setShowCreateCourse(false);
    }
  };

  // Handle course status change
  const handleStatusChange = (courseId: number, newStatus: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: newStatus, lastUpdated: "Just now" }
        : course
    ));
  };

  // Handle course deletion
  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#9faeed] to-[#6daedb] rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
                <p className="text-gray-600">Manage your courses and students</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="border-soft hover:border-glow"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard/instructor/create-course'}
                className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
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
                      {stat.change} from last month
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

        {/* Courses Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-soft rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border-soft hover:border-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.students} students enrolled
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
                      <Clock className="w-4 h-4 mr-2" />
                      Last updated {course.lastUpdated}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-soft hover:border-glow flex-1"
                        onClick={() => {/* Handle view course */}}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-soft hover:border-glow flex-1"
                        onClick={() => {/* Handle edit course */}}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-soft hover:border-glow text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-soft hover:border-glow flex-1"
                        onClick={() => handleStatusChange(course.id, course.status === 'active' ? 'draft' : 'active')}
                      >
                        {course.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Students Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Card key={student.id} className="border-soft hover:border-glow transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <Badge 
                      variant={student.status === 'active' ? 'default' : 'secondary'}
                      className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {student.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Course:</span> {student.course}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Progress:</span> {student.progress}%
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Last Active:</span> {student.lastActive}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="border-soft hover:border-glow h-20 flex-col"
              onClick={() => setShowCreateCourse(true)}
            >
              <BookOpen className="w-6 h-6 mb-2" />
              <span>Add Course Material</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-soft hover:border-glow h-20 flex-col"
              onClick={() => {/* Handle manage students */}}
            >
              <Users className="w-6 h-6 mb-2" />
              <span>Manage Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-soft hover:border-glow h-20 flex-col"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>View Analytics</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-soft hover:border-glow h-20 flex-col"
              onClick={() => {/* Handle settings */}}
            >
              <Settings className="w-6 h-6 mb-2" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="mt-8">
            <Card className="border-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analytics Overview
                </CardTitle>
                <CardDescription>
                  Detailed insights into your courses and student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-[#9faeed] to-[#6daedb] rounded-lg text-white">
                    <div className="text-2xl font-bold">105</div>
                    <div className="text-sm opacity-90">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#6daedb] to-[#2f4e7a] rounded-lg text-white">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-sm opacity-90">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#2f4e7a] to-[#143c78] rounded-lg text-white">
                    <div className="text-2xl font-bold">4.2h</div>
                    <div className="text-sm opacity-90">Avg Study Time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-[#143c78] to-[#0a0e1a] rounded-lg text-white">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-sm opacity-90">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}