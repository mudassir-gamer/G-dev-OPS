import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;

  try {
    const course = await prisma.course.findUnique({
      where: { slug: resolvedParams.slug },
      include: {
        instructor: { select: { name: true, avatarUrl: true, bio: true } },
        categoryRel: { select: { name: true, slug: true, color: true } },
        sections: {
          orderBy: { order: "asc" },
          include: {
            lectures: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                slug: true,
                videoDuration: true,
                isPreview: true,
                order: true,
              },
            },
          },
        },
        outcomes: { select: { content: true } },
        reviews: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            student: { select: { name: true, avatarUrl: true } },
          },
        },
        _count: { select: { lectures: true } },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      thumbnail: course.thumbnailUrl,
      trailerUrl: course.trailerUrl,
      level: course.level,
      language: course.language,
      price: Number(course.price),
      discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
      durationHours: course.durationHours,
      totalLectures: course.totalLectures || course._count.lectures,
      totalStudents: course.totalStudents,
      rating: Number(course.rating),
      totalReviews: course.totalReviews,
      isFree: course.isFree,
      instructor: course.instructor,
      category: course.categoryRel,
      sections: course.sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        order: section.order,
        lectures: section.lectures,
      })),
      outcomes: course.outcomes.length > 0 ? course.outcomes : [
        { content: "Understand the fundamentals of game development" },
        { content: "Build complete projects from scratch" },
        { content: "Apply industry best practices" },
        { content: "Create publishable games" },
      ],
      reviews: course.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        student: review.student,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
