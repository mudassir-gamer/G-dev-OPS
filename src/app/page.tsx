"use client";

import { useState } from "react";
import { ArrowRight, Users, BookOpen, Trophy, Zap, Star, Play, Mail, CheckCircle, TrendingUp, Clock, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FadeIn, StaggerContainer, StaggerItem, FloatingElement, AnimatedCounter, ScaleIn } from "@/components/animations/Animations";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world game development experience.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join thousands of students and instructors in our active learning community.",
  },
  {
    icon: Trophy,
    title: "Certifications",
    description: "Earn recognized certifications to boost your game development career.",
  },
  {
    icon: Zap,
    title: "Hands-On Projects",
    description: "Build real games and portfolio projects as you learn.",
  },
];

const categories = [
  {
    title: "Roblox Development",
    description: "Create immersive experiences with Luau scripting and Roblox Studio.",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 24,
    color: "#3B82F6",
  },
  {
    title: "Unity",
    description: "Master C# scripting and build cross-platform games with Unity.",
    image: "https://images.pexels.com/photos/1670974/pexels-photo-1670974.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 32,
    color: "#F59E0B",
  },
  {
    title: "Unreal Engine",
    description: "Create stunning AAA-quality games with Blueprints and C++.",
    image: "https://images.pexels.com/photos/1819473/pexels-photo-1819473.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 18,
    color: "#EC4899",
  },
  {
    title: "Indie Development",
    description: "Build your dream indie game from concept to launch.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    courses: 15,
    color: "#10B981",
  },
];

const testimonials = [
  {
    name: "Alex Chen",
    role: "Indie Game Developer",
    content: "G Dev OPS transformed my game development skills. I went from a complete beginner to publishing my first Roblox game in just 3 months!",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Unity Developer at Gearbox",
    content: "The Unity courses are incredibly well-structured. The hands-on projects helped me land my dream job at a game studio.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Game Design Student",
    content: "Best investment I ever made. The community support and instructor feedback made all the difference in my learning journey.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
  },
];

const stats = [
  { label: "Students", value: 50000, icon: Users },
  { label: "Courses", value: 120, icon: BookOpen },
  { label: "Instructors", value: 45, icon: Award },
  { label: "Certificates Issued", value: 15000, icon: Trophy },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      console.error("Failed to subscribe");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-20 left-10 w-20 h-20 rounded-full bg-purple-500/10 blur-2xl">
            <span />
          </FloatingElement>
          <FloatingElement className="absolute top-40 right-20 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl">
            <span />
          </FloatingElement>
          <FloatingElement className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-pink-500/10 blur-2xl">
            <span />
          </FloatingElement>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm mb-8">
              <Zap className="w-4 h-4" />
              New: Advanced Unreal Engine 5 Course Available
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Learn Game Development</span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">Build Your Dreams</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Master Roblox, Unity, Unreal Engine, and indie game development.
              From beginner to professional, we have the perfect course for you.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/courses" variant="primary" size="lg">
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href="/register" variant="outline" size="lg">
                Get Started Free
              </Button>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={0.4 + i * 0.1}>
                <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    <AnimatedCounter value={stat.value} />+
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Why Choose G Dev OPS</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to become a professional game developer.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerContainer className="contents">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <Card className="text-center hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Popular Categories</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose your path and start building amazing games.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerContainer className="contents">
              {categories.map((category) => (
                <StaggerItem key={category.title}>
                  <Link href={`/courses?category=${category.title.toLowerCase()}`} className="group">
                    <Card className="overflow-hidden hover:shadow-xl transition-all h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{category.description}</p>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                            {category.courses} courses
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Featured Course */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Featured Course"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">4.9</span>
                  </div>
                  <p className="text-sm text-gray-500">12,500+ students</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium">
                  Featured Course
                </span>
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium">
                  Bestseller
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Roblox Fundamentals: From Zero to Hero
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Master Roblox Studio and Luau scripting from scratch. Build your first game in just
                2 weeks with our comprehensive, project-based curriculum.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  12 hours
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BookOpen className="w-5 h-5" />
                  45 lessons
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Trophy className="w-5 h-5" />
                  Certificate
                </div>
              </div>
              <Button href="/courses/roblox-fundamentals" variant="primary" size="lg">
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Student Success Stories</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Hear from our students who transformed their careers with G Dev OPS.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerContainer className="contents">
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.name}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= testimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Mail className="w-16 h-16 text-white mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with New Courses
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get notified when we release new courses, free tutorials, and special offers.
              Join 10,000+ developers already subscribed.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 flex-1 max-w-md"
                />
                <Button type="submit" variant="primary" size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                  Subscribe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScaleIn>
            <TrendingUp className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of students already building their game development careers.
              Start learning today with our free courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/register" variant="primary" size="lg">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href="/courses" variant="outline" size="lg">
                Browse All Courses
              </Button>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}
