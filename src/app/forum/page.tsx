"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  MessageSquare,
  Heart,
  Pin,
  Lock,
  Eye,
  Clock,
  User,
  Search,
  Plus,
  TrendingUp,
  Flame,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/Animations";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: { name: string };
  category: { name: string; color: string };
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  likeCount: number;
  replyCount: number;
  lastReplyAt: string | null;
  createdAt: string;
}

const fallbackCategories = [
  { id: "1", name: "General Discussion", slug: "general", color: "#8B5CF6", postCount: 125, icon: MessageSquare },
  { id: "2", name: "Help & Support", slug: "help-support", color: "#EF4444", postCount: 89, icon: MessageCircle },
  { id: "3", name: "Showcase", slug: "showcase", color: "#10B981", postCount: 67, icon: Flame },
  { id: "4", name: "Roblox Development", slug: "roblox", color: "#3B82F6", postCount: 156, icon: TrendingUp },
  { id: "5", name: "Unity Development", slug: "unity", color: "#F59E0B", postCount: 98, icon: TrendingUp },
  { id: "6", name: "Unreal Engine", slug: "unreal-engine", color: "#EC4899", postCount: 45, icon: TrendingUp },
];

const fallbackPosts: Post[] = [
  {
    id: "1",
    title: "How do I optimize my Roblox game for mobile?",
    slug: "how-do-i-optimize-my-roblox-game-mobile",
    content: "I'm working on a game that runs fine on PC but lags on mobile...",
    author: { name: "GameDev_Newbie" },
    category: { name: "Roblox Development", color: "#3B82F6" },
    isPinned: true,
    isLocked: false,
    viewCount: 1250,
    likeCount: 45,
    replyCount: 23,
    lastReplyAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "2",
    title: "Showcase: My First Published Game!",
    slug: "showcase-first-published-game",
    content: "Just published my first game on Roblox!",
    author: { name: "IndieCreator" },
    category: { name: "Showcase", color: "#10B981" },
    isPinned: false,
    isLocked: false,
    viewCount: 890,
    likeCount: 120,
    replyCount: 34,
    lastReplyAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Best practices for Unity physics?",
    slug: "best-practices-unity-physics",
    content: "Looking for advice on setting up physics in Unity...",
    author: { name: "UnityPro" },
    category: { name: "Unity Development", color: "#F59E0B" },
    isPinned: false,
    isLocked: false,
    viewCount: 567,
    likeCount: 67,
    replyCount: 18,
    lastReplyAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

export default function ForumPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "unanswered">("latest");

  const filteredPosts = fallbackPosts.filter((post) => {
    if (selectedCategory && post.category.name.toLowerCase().includes(selectedCategory)) return true;
    if (!selectedCategory) return true;
    return false;
  }).filter((post) => {
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Community Forum</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with fellow game developers, ask questions, and share your projects.
            </p>
          </div>
        </FadeIn>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="unanswered">Unanswered</option>
            </select>
            {session && (
              <Button href="/forum/new" variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">Categories</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory
                      ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  All Categories
                </button>
                {fallbackCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.slug
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </span>
                    <span className="text-xs">{category.postCount}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-4">
              <CardHeader>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">Forum Stats</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Posts</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">1,680</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Members</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">5,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Online Now</span>
                    <span className="font-bold text-green-600">42</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-3">
            <StaggerContainer className="space-y-4">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/forum/${post.slug}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: post.category.color + "20" }}
                          >
                            <MessageSquare
                              className="w-5 h-5"
                              style={{ color: post.category.color }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {post.isPinned && (
                                <Pin className="w-4 h-4 text-yellow-500" />
                              )}
                              {post.isLocked && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                                {post.title}
                              </h3>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                              <span
                                className="px-2 py-0.5 rounded text-xs"
                                style={{
                                  backgroundColor: post.category.color + "20",
                                  color: post.category.color,
                                }}
                              >
                                {post.category.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {post.author.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(post.createdAt)}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.viewCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likeCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {post.replyCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No posts found in this category.</p>
                </div>
              )}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
