"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Star,
  Clock,
  Users,
  Play,
  FileText,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/Animations";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  trailerUrl: string | null;
  level: string;
  language: string;
  price: number;
  discountPrice: number | null;
  durationHours: number;
  totalLectures: number;
  totalStudents: number;
  rating: number;
  totalReviews: number;
  isFree: boolean;
  instructor: {
    name: string;
    avatarUrl: string | null;
    bio: string | null;
  } | null;
  category: {
    name: string;
    slug: string;
    color: string | null;
  } | null;
  sections: Array<{
    id: string;
    title: string;
    description: string | null;
    order: number;
    lectures: Array<{
      id: string;
      title: string;
      slug: string | null;
      videoDuration: number;
      isPreview: boolean;
      order: number;
    }>;
  }>;
  outcomes: Array<{ content: string }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    student: { name: string; avatarUrl: string | null };
  }>;
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  const resolvedParams = use(params);
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "reviews">("overview");

  useEffect(() => {
    fetchCourse();
  }, [resolvedParams.slug]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${resolvedParams.slug}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        // Use fallback data
        setCourse(getFallbackCourse(resolvedParams.slug));
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      setCourse(getFallbackCourse(resolvedParams.slug));
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleEnroll = async () => {
    if (!session) {
      window.location.href = "/login?callbackUrl=/courses/" + resolvedParams.slug;
      return;
    }
    // Enroll logic
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button href="/courses">Browse Courses</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 text-white">
              <FadeIn>
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                  <Link href="/courses" className="hover:text-white">Courses</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span>{course.category?.name}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white truncate">{course.title}</span>
                </nav>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>

                <p className="text-lg text-white/90 mb-6 max-w-3xl">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-white/70">({course.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    {course.totalStudents.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    {course.durationHours} hours
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-5 h-5" />
                    {course.totalLectures} lectures
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm">{course.level}</span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm">{course.language}</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: course.category?.color || "#8B5CF6" }}>
                    {course.category?.name}
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.2}>
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                      {course.trailerUrl ? (
                        <iframe
                          src={course.trailerUrl}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full gradient-bg flex items-center justify-center">
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="text-center mb-4">
                      {course.isFree ? (
                        <span className="text-3xl font-bold gradient-text">Free</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold gradient-text">
                            ${course.discountPrice || course.price}
                          </span>
                          {course.discountPrice && (
                            <span className="ml-2 text-lg text-gray-400 line-through">
                              ${course.price}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full mb-3"
                      onClick={handleEnroll}
                    >
                      {course.isFree ? "Enroll for Free" : "Enroll Now"}
                    </Button>

                    <Button variant="outline" size="lg" className="w-full mb-4">
                      Preview Course
                    </Button>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Full lifetime access
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Certificate of completion
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Project-based learning
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Community support
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                        <Bookmark className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "curriculum", label: "Curriculum" },
                { id: "reviews", label: `Reviews (${course.totalReviews})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <FadeIn>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                      What you&apos;ll learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-400">{outcome.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Requirements
                    </h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                        Basic computer skills
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                        No prior game development experience needed
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" />
                        A computer running Windows, macOS, or Linux
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Description
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-4">
                        This comprehensive course will guide you from beginner to proficient game developer.
                        You&apos;ll learn through hands-on projects, real-world examples, and practical exercises.
                        By the end of this course, you&apos;ll have the skills and confidence to create your own games.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.totalLectures} lectures • {course.durationHours} hours total
                  </p>
                </div>

                <StaggerContainer className="space-y-3">
                  {course.sections.map((section) => (
                    <StaggerItem key={section.id}>
                      <Card>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedSections.has(section.id) ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                {section.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {section.lectures.length} lectures •{" "}
                                {Math.round(section.lectures.reduce((acc, l) => acc + l.videoDuration, 0))} min
                              </p>
                            </div>
                          </div>
                        </button>

                        {expandedSections.has(section.id) && (
                          <div className="border-t border-gray-200 dark:border-gray-700">
                            {section.lectures.map((lecture) => (
                              <div
                                key={lecture.id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-700 dark:text-gray-300">{lecture.title}</span>
                                  {lecture.isPreview && (
                                    <span className="px-2 py-0.5 text-xs rounded bg-green-100 dark:bg-green-900/20 text-green-600">
                                      Preview
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{lecture.videoDuration} min</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <FadeIn>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center">
                      <p className="text-6xl font-bold gradient-text">{course.rating}</p>
                      <div className="flex justify-center gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(course.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-500">{course.totalReviews} reviews</p>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = course.reviews.filter((r) => r.rating === rating).length;
                        const percentage = (count / course.totalReviews) * 100 || 0;
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="w-12 text-sm text-gray-600 dark:text-gray-400">{rating} star</span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-12 text-sm text-gray-500">{percentage.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>

                <div className="space-y-4">
                  {course.reviews.length > 0 ? (
                    course.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold">
                                {review.student.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {review.student.name}
                                </span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600">
                                  <ThumbsUp className="w-4 h-4" />
                                  Helpful
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Instructor */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.3}>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Instructor</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
                      {course.instructor?.avatarUrl ? (
                        <img
                          src={course.instructor.avatarUrl}
                          alt={course.instructor.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-white font-bold">
                          {course.instructor?.name?.charAt(0) || "I"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {course.instructor?.name}
                      </p>
                      <p className="text-sm text-gray-500">Game Development Instructor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      4.9 Rating
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      50k+ Students
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.instructor?.bio || "Experienced game developer and educator passionate about helping others learn game development."}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

function getFallbackCourse(slug: string): Course {
  return {
    id: "1",
    title: "Roblox Fundamentals",
    slug,
    description: "Learn the basics of Roblox Studio and Luau scripting to create your first game.",
    thumbnail: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    trailerUrl: null,
    level: "Beginner",
    language: "English",
    price: 0,
    discountPrice: null,
    durationHours: 12,
    totalLectures: 45,
    totalStudents: 12500,
    rating: 4.8,
    totalReviews: 890,
    isFree: true,
    instructor: { name: "Alex Chen", avatarUrl: null, bio: null },
    category: { name: "Roblox", slug: "roblox", color: "#3B82F6" },
    sections: [
      {
        id: "s1",
        title: "Getting Started with Roblox Studio",
        description: "Learn the basics",
        order: 1,
        lectures: [
          { id: "l1", title: "Introduction to Roblox", slug: "intro", videoDuration: 15, isPreview: true, order: 1 },
          { id: "l2", title: "Setting Up Your Workspace", slug: "workspace", videoDuration: 20, isPreview: false, order: 2 },
          { id: "l3", title: "Understanding the Interface", slug: "interface", videoDuration: 18, isPreview: false, order: 3 },
        ],
      },
      {
        id: "s2",
        title: "Building Your First World",
        description: "Create your first game",
        order: 2,
        lectures: [
          { id: "l4", title: "Working with Parts", slug: "parts", videoDuration: 25, isPreview: false, order: 1 },
          { id: "l5", title: "Adding Interactivity", slug: "interactivity", videoDuration: 30, isPreview: false, order: 2 },
        ],
      },
    ],
    outcomes: [
      { content: "Understand the fundamentals of Roblox Studio" },
      { content: "Create and script interactive game elements" },
      { content: "Build a complete game from scratch" },
      { content: "Publish and share your games with others" },
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Amazing course! I went from knowing nothing to publishing my first game.",
        createdAt: new Date().toISOString(),
        student: { name: "John D.", avatarUrl: null },
      },
      {
        id: "r2",
        rating: 4,
        comment: "Great content and clear explanations. Would recommend to beginners.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        student: { name: "Sarah M.", avatarUrl: null },
      },
    ],
  };
}
