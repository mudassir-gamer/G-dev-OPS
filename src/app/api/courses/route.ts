import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const skip = (page - 1) * limit;

  try {
    const where: any = { isPublished: true };

    if (category && category !== "all") {
      where.categoryRel = { slug: category };
    }

    if (level && level !== "all") {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    let orderBy: any = {};
    switch (sort) {
      case "newest":
        orderBy = { publishedAt: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "price-low":
        orderBy = { price: "asc" };
        break;
      case "price-high":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { studentCount: "desc" };
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          instructor: { select: { name: true, avatarUrl: true } },
          categoryRel: { select: { name: true, slug: true, color: true } },
          _count: { select: { lectures: true, reviews: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      courses: courses.map((course) => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        thumbnail: course.thumbnailUrl,
        instructor: course.instructor,
        category: course.categoryRel,
        level: course.level,
        price: Number(course.price),
        discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
        durationHours: course.durationHours,
        totalLectures: course.totalLectures || course._count.lectures,
        totalStudents: course.totalStudents,
        rating: Number(course.rating),
        totalReviews: course.totalReviews || course._count.reviews,
        isFeatured: course.isFeatured,
        isFree: course.isFree,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
