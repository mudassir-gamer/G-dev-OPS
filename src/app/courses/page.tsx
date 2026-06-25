"use client";

import { useState, useEffect } from "react";
import { Star, Clock, Users, Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/Animations";

const categories = [
  { id: "all", name: "All Courses" },
  { id: "roblox", name: "Roblox" },
  { id: "unity", name: "Unity" },
  { id: "unreal-engine", name: "Unreal Engine" },
  { id: "indie", name: "Indie Development" },
  { id: "programming", name: "Programming" },
  { id: "game-design", name: "Game Design" },
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const fallbackCourses = [
  {
    id: "1",
    title: "Roblox Fundamentals",
    slug: "roblox-fundamentals",
    description: "Learn the basics of Roblox Studio and Luau scripting.",
    instructor: { name: "Alex Chen" },
    thumbnail: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Roblox", color: "#3B82F6" },
    rating: 4.8,
    totalStudents: 12500,
    durationHours: 12,
    price: 0,
    level: "Beginner",
    totalLectures: 45,
    totalReviews: 890,
    isFree: true,
  },
  {
    id: "2",
    title: "Unity 2D Game Development",
    slug: "unity-2d-game-development",
    description: "Create stunning 2D games with Unity and C#.",
    instructor: { name: "Sarah Williams" },
    thumbnail: "https://images.pexels.com/photos/1670974/pexels-photo-1670974.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Unity", color: "#F59E0B" },
    rating: 4.9,
    totalStudents: 8200,
    durationHours: 24,
    price: 49,
    level: "Intermediate",
    totalLectures: 78,
    totalReviews: 650,
    isFree: false,
  },
  {
    id: "3",
    title: "Unreal Engine 5 Mastery",
    slug: "unreal-engine-5-mastery",
    description: "Build AAA-quality games with Unreal Engine 5 and Blueprints.",
    instructor: { name: "Marcus Johnson" },
    thumbnail: "https://images.pexels.com/photos/1819473/pexels-photo-1819473.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Unreal Engine", color: "#EC4899" },
    rating: 4.7,
    totalStudents: 5600,
    durationHours: 40,
    price: 99,
    level: "Advanced",
    totalLectures: 120,
    totalReviews: 420,
    isFree: false,
  },
  {
    id: "4",
    title: "Indie Game Marketing",
    slug: "indie-game-marketing",
    description: "Learn how to market and monetize your indie game successfully.",
    instructor: { name: "Emily Rodriguez" },
    thumbnail: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Indie", color: "#10B981" },
    rating: 4.6,
    totalStudents: 3200,
    durationHours: 8,
    price: 29,
    level: "Intermediate",
    totalLectures: 32,
    totalReviews: 280,
    isFree: false,
  },
  {
    id: "5",
    title: "Advanced Roblox Systems",
    slug: "advanced-roblox-systems",
    description: "Build complex game systems with DataStores and OOP patterns.",
    instructor: { name: "Jordan Lee" },
    thumbnail: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Roblox", color: "#3B82F6" },
    rating: 4.9,
    totalStudents: 6800,
    durationHours: 20,
    price: 39,
    level: "Intermediate",
    totalLectures: 56,
    totalReviews: 510,
    isFree: false,
  },
  {
    id: "6",
    title: "Unity Multiplayer Games",
    slug: "unity-multiplayer-games",
    description: "Create online multiplayer games with Unity Netcode and Photon.",
    instructor: { name: "David Park" },
    thumbnail: "https://images.pexels.com/photos/7915533/pexels-photo-7915533.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: { name: "Unity", color: "#F59E0B" },
    rating: 4.8,
    totalStudents: 4500,
    durationHours: 32,
    price: 79,
    level: "Advanced",
    totalLectures: 92,
    totalReviews: 380,
    isFree: false,
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(fallbackCourses);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel, sortBy]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (selectedLevel !== "All Levels") params.append("level", selectedLevel);
      params.append("sort", sortBy);
      if (search) params.append("search", search);

      const response = await fetch(`/api/courses?${params}`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses.length > 0 ? data.courses : fallbackCourses);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  const filtered = courses.filter((course) => {
    if (search) {
      const term = search.toLowerCase();
      if (!course.title.toLowerCase().includes(term) && !course.description?.toLowerCase().includes(term)) {
        return false;
      }
    }
    if (selectedCategory !== "all" && course.category?.name.toLowerCase() !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Explore Our Courses</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect course to level up your game development skills. Learn from industry experts.
            </p>
          </div>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.1}>
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for courses, topics, or instructors..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-gray-100 shadow-sm"
              />
              <Button type="submit" variant="primary" className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "gradient-bg text-white"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </FadeIn>

        {/* Course Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            <StaggerContainer className={viewMode === "grid"
              ? "contents"
              : "space-y-4"
            }>
              {filtered.map((course) => (
                <StaggerItem key={course.id}>
                  <CourseCard course={course} viewMode={viewMode} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course, viewMode }: { course: typeof fallbackCourses[0]; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
            <img
              src={course.thumbnail || "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            {course.isFree && (
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                Free
              </span>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: course.category?.color + "20", color: course.category?.color }}>
                    {course.category?.name}
                  </span>
                  <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">by {course.instructor?.name}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold gradient-text">
                  {course.isFree ? "Free" : `$${course.price}`}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {course.rating} ({course.totalReviews})
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.totalStudents.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.durationHours}h
                </div>
              </div>
              <Button href={`/courses/${course.slug}`} variant="primary" size="sm">
                View Course
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail || "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            course.level === "Beginner" ? "bg-green-500" :
            course.level === "Intermediate" ? "bg-yellow-500" : "bg-red-500"
          } text-white`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: course.category?.color }}>
            {course.category?.name}
          </span>
        </div>
        {course.isFree && (
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">Free</span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
        <p className="text-sm text-gray-500 mb-4">by {course.instructor?.name}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {course.rating}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.totalStudents.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.durationHours}h
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">
            {course.isFree ? "Free" : `$${course.price}`}
          </span>
          <Button href={`/courses/${course.slug}`} variant="primary" size="sm">
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
