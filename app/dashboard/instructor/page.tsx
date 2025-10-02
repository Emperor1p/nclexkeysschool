"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Award
} from "lucide-react";

export default function InstructorDashboard() {
  const [courses] = useState([
    {
      id: 1,
      title: "NCLEX-RN Comprehensive Review",
      students: 45,
      status: "active",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Pharmacology Fundamentals",
      students: 32,
      status: "active", 
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Medical-Surgical Nursing",
      students: 28,
      status: "draft",
      lastUpdated: "3 days ago"
    }
  ]);

  const stats = [
    {
      title: "Total Students",
      value: "105",
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Courses",
      value: "3",
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
            <Button className="bg-gradient-to-r from-[#9faeed] to-[#6daedb] hover:from-[#6daedb] hover:to-[#2f4e7a] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
            <Button variant="outline" className="border-soft hover:border-glow">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="border-soft hover:border-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.students} students enrolled
                      </CardDescription>
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
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Last updated {course.lastUpdated}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-soft hover:border-glow flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="border-soft hover:border-glow flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-soft hover:border-glow text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-soft hover:border-glow h-20 flex-col">
              <BookOpen className="w-6 h-6 mb-2" />
              <span>Add Course Material</span>
            </Button>
            <Button variant="outline" className="border-soft hover:border-glow h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span>Manage Students</span>
            </Button>
            <Button variant="outline" className="border-soft hover:border-glow h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>View Analytics</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}