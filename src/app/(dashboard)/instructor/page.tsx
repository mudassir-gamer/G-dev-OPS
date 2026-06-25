"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { label: "Total Students", value: "1,234", change: "+12%" },
  { label: "Courses", value: "8", change: "+1" },
  { label: "Total Revenue", value: "$24,560", change: "+8%" },
  { label: "Avg. Rating", value: "4.8", change: "+0.2" },
];

const coursesData = [
  { title: "Roblox Fundamentals", students: 450, revenue: "$4,500", rating: 4.8, status: "published" },
  { title: "Advanced Roblox Systems", students: 280, revenue: "$2,800", rating: 4.9, status: "published" },
  { title: "Unity 2D Game Dev", students: 340, revenue: "$3,400", rating: 4.7, status: "published" },
  { title: "Unreal Engine 5 Mastery", students: 0, revenue: "$0", rating: 0, status: "draft" },
];

export default function InstructorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (session?.user?.role !== "instructor" && session?.user?.role !== "admin") {
    router.push("/student");
    return null;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Instructor Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {session?.user?.name}! Here&apos;s your teaching overview.
          </p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Courses</h2>
          <Button variant="secondary" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Course</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Students</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Rating</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursesData.map((course) => (
                  <tr key={course.title} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        {course.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">{course.revenue}</td>
                    <td className="py-4 px-4">
                      {course.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-900 dark:text-gray-100">{course.rating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === "published"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Student Reviews</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Student {i}</span>
                  <div className="flex ml-auto">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= 5 - i ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Great course! Learned so much about game development.</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Quick Actions</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="secondary" className="w-full justify-start">Add new lesson</Button>
            <Button variant="secondary" className="w-full justify-start">Reply to student questions</Button>
            <Button variant="secondary" className="w-full justify-start">Update course content</Button>
            <Button variant="secondary" className="w-full justify-start">View earnings report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
