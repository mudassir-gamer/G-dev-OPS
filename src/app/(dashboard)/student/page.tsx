"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle } from "lucide-react";

const progressData = [
  { course: "Roblox Fundamentals", progress: 75, lessons: 12, completed: 9 },
  { course: "Unity 2D Game Dev", progress: 40, lessons: 24, completed: 10 },
];

const recommendedCourses = [
  { title: "Advanced Roblox Systems", category: "Roblox", duration: "20 hours", rating: 4.9 },
  { title: "Unreal Engine 5 Basics", category: "Unreal Engine", duration: "18 hours", rating: 4.8 },
];

export default function StudentDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey. You have {progressData.length} courses in progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{progressData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {progressData.reduce((acc, c) => acc + c.completed, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Continue Learning</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {progressData.map((course) => (
                <div key={course.course} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{course.course}</h3>
                    <span className="text-sm text-purple-600 font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full gradient-bg rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{course.completed}/{course.lessons} lessons</span>
                    <button className="flex items-center gap-1 text-purple-600 hover:underline">
                      <Play className="w-4 h-4" />
                      Resume
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recommended For You</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedCourses.map((course) => (
                <div key={course.title} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-colors cursor-pointer">
                  <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">{course.category}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                    <span className="text-yellow-500">★ {course.rating}</span>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-purple-600 hover:underline text-sm">
                View all courses →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
