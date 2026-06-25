import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;

  const isAuthPage =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register") ||
    nextUrl.pathname.startsWith("/forgot-password") ||
    nextUrl.pathname.startsWith("/reset-password") ||
    nextUrl.pathname.startsWith("/verify-email");

  const isDashboard = nextUrl.pathname.startsWith("/student") || nextUrl.pathname.startsWith("/instructor");
  const isStudentDashboard = nextUrl.pathname.startsWith("/student");
  const isInstructorDashboard = nextUrl.pathname.startsWith("/instructor");

  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isStudentDashboard && session?.user.role !== "student" && session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/instructor", nextUrl));
  }

  if (isInstructorDashboard && session?.user.role !== "instructor" && session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/student", nextUrl));
  }

  if (isAuthPage && isLoggedIn) {
    if (session?.user.role === "instructor") {
      return NextResponse.redirect(new URL("/instructor", nextUrl));
    }
    return NextResponse.redirect(new URL("/student", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ],
};
