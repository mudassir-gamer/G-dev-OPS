import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  await prisma.contactMessage.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.quizResult.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lecture.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@gdevops.com',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  const instructorUser1 = await prisma.user.create({
    data: {
      name: 'Alex Chen',
      email: 'alex@gdevops.com',
      password: hashedPassword,
      role: 'instructor',
      emailVerified: new Date(),
    },
  });

  const instructorUser2 = await prisma.user.create({
    data: {
      name: 'Sarah Williams',
      email: 'sarah@gdevops.com',
      password: hashedPassword,
      role: 'instructor',
      emailVerified: new Date(),
    },
  });

  const instructorUser3 = await prisma.user.create({
    data: {
      name: 'Marcus Johnson',
      email: 'marcus@gdevops.com',
      password: hashedPassword,
      role: 'instructor',
      emailVerified: new Date(),
    },
  });

  const studentUser1 = await prisma.user.create({
    data: {
      name: 'Emily Davis',
      email: 'emily@student.com',
      password: hashedPassword,
      role: 'student',
      emailVerified: new Date(),
    },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      name: 'James Wilson',
      email: 'james@student.com',
      password: hashedPassword,
      role: 'student',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created users');

  // Create categories
  const robloxCat = await prisma.category.create({
    data: {
      name: 'Roblox Development',
      slug: 'roblox-development',
      description: 'Learn to create games with Roblox Studio and Luau programming',
      icon: 'gamepad',
      color: '#E2231A',
      order: 1,
    },
  });

  const unityCat = await prisma.category.create({
    data: {
      name: 'Unity',
      slug: 'unity',
      description: 'Master 2D and 3D game development with Unity engine',
      icon: 'cube',
      color: '#FFFFFF',
      order: 2,
    },
  });

  const unrealCat = await prisma.category.create({
    data: {
      name: 'Unreal Engine',
      slug: 'unreal-engine',
      description: 'Build AAA-quality games with Unreal Engine 5',
      icon: 'rocket',
      color: '#0DBEFE',
      order: 3,
    },
  });

  const indieCat = await prisma.category.create({
    data: {
      name: 'Indie Development',
      slug: 'indie-development',
      description: 'Turn your game ideas into reality as an indie developer',
      icon: 'star',
      color: '#6366F1',
      order: 4,
    },
  });

  console.log('✅ Created categories');

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Roblox Fundamentals',
      slug: 'roblox-fundamentals',
      description: 'Learn the basics of Roblox Studio and Luau scripting. Build your first game from scratch.',
      thumbnailUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser1.id,
      categoryId: robloxCat.id,
      category: 'Roblox',
      level: 'Beginner',
      price: 0,
      durationHours: 12,
      totalLectures: 24,
      isPublished: true,
      isFeatured: true,
      isFree: true,
      publishedAt: new Date(),
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Unity 2D Game Development',
      slug: 'unity-2d-game-development',
      description: 'Create stunning 2D games with Unity. Master sprites, animations, and physics.',
      thumbnailUrl: 'https://images.pexels.com/photos/1670974/pexels-photo-1670974.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser2.id,
      categoryId: unityCat.id,
      category: 'Unity',
      level: 'Intermediate',
      price: 49.99,
      durationHours: 24,
      totalLectures: 48,
      isPublished: true,
      isFeatured: true,
      publishedAt: new Date(),
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Unreal Engine 5 Mastery',
      slug: 'unreal-engine-5-mastery',
      description: 'Build AAA-quality games with Unreal Engine 5. Learn Blueprints and C++.',
      thumbnailUrl: 'https://images.pexels.com/photos/1819473/pexels-photo-1819473.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser3.id,
      categoryId: unrealCat.id,
      category: 'Unreal Engine',
      level: 'Advanced',
      price: 99.99,
      durationHours: 40,
      totalLectures: 80,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: 'Indie Game Marketing',
      slug: 'indie-game-marketing',
      description: 'Learn how to market and monetize your indie game. From concept to launch.',
      thumbnailUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser1.id,
      categoryId: indieCat.id,
      category: 'Indie',
      level: 'Intermediate',
      price: 29.99,
      durationHours: 8,
      totalLectures: 16,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  const course5 = await prisma.course.create({
    data: {
      title: 'Advanced Roblox Systems',
      slug: 'advanced-roblox-systems',
      description: 'Build complex game systems with DataStores, leaderstats, and optimization.',
      thumbnailUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser1.id,
      categoryId: robloxCat.id,
      category: 'Roblox',
      level: 'Intermediate',
      price: 39.99,
      durationHours: 20,
      totalLectures: 40,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  const course6 = await prisma.course.create({
    data: {
      title: 'Unity Multiplayer Games',
      slug: 'unity-multiplayer-games',
      description: 'Create online multiplayer games with Unity Netcode and Photon.',
      thumbnailUrl: 'https://images.pexels.com/photos/7915533/pexels-photo-7915533.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser2.id,
      categoryId: unityCat.id,
      category: 'Unity',
      level: 'Advanced',
      price: 79.99,
      durationHours: 32,
      totalLectures: 64,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  // Draft course
  const course7 = await prisma.course.create({
    data: {
      title: '3D Character Modeling',
      slug: '3d-character-modeling',
      description: 'Create stunning 3D characters for your games.',
      thumbnailUrl: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      instructorId: instructorUser3.id,
      categoryId: unrealCat.id,
      category: 'Unreal Engine',
      level: 'Expert',
      price: 129.99,
      durationHours: 50,
      isPublished: false,
    },
  });

  console.log('✅ Created courses');

  // Create sections
  const section1 = await prisma.section.create({
    data: {
      courseId: course1.id,
      title: 'Getting Started',
      description: 'Introduction to Roblox Studio and basic concepts',
      order: 1,
    },
  });

  const section2 = await prisma.section.create({
    data: {
      courseId: course1.id,
      title: 'Building Your First Game',
      description: 'Create your first complete game in Roblox',
      order: 2,
    },
  });

  const section3 = await prisma.section.create({
    data: {
      courseId: course2.id,
      title: 'Unity Basics',
      description: 'Understanding the Unity editor and workflow',
      order: 1,
    },
  });

  console.log('✅ Created sections');

  // Create lectures
  const lectures = [
    // Course 1 - Section 1
    { sectionId: section1.id, courseId: course1.id, title: 'Introduction to Roblox', slug: 'intro-roblox', order: 1, isPreview: true, videoDuration: 15 },
    { sectionId: section1.id, courseId: course1.id, title: 'Installing Roblox Studio', slug: 'install-studio', order: 2, isPreview: false, videoDuration: 10 },
    { sectionId: section1.id, courseId: course1.id, title: 'Studio Interface Overview', slug: 'studio-interface', order: 3, isPreview: false, videoDuration: 20 },
    { sectionId: section1.id, courseId: course1.id, title: 'Basic Building Blocks', slug: 'basic-blocks', order: 4, isPreview: false, videoDuration: 25 },
    { sectionId: section1.id, courseId: course1.id, title: 'Understanding Parts and Properties', slug: 'parts-properties', order: 5, isPreview: false, videoDuration: 30 },
    { sectionId: section1.id, courseId: course1.id, title: 'Introduction to Luau', slug: 'intro-luau', order: 6, isPreview: true, videoDuration: 35 },

    // Course 1 - Section 2
    { sectionId: section2.id, courseId: course1.id, title: 'Planning Your First Game', slug: 'planning-game', order: 7, isPreview: false, videoDuration: 20 },
    { sectionId: section2.id, courseId: course1.id, title: 'Building the Game World', slug: 'building-world', order: 8, isPreview: false, videoDuration: 45 },
    { sectionId: section2.id, courseId: course1.id, title: 'Adding Player Controls', slug: 'player-controls', order: 9, isPreview: false, videoDuration: 40 },
    { sectionId: section2.id, courseId: course1.id, title: 'Creating Game Mechanics', slug: 'game-mechanics', order: 10, isPreview: false, videoDuration: 50 },
    { sectionId: section2.id, courseId: course1.id, title: 'Testing and Publishing', slug: 'testing-publishing', order: 11, isPreview: false, videoDuration: 30 },

    // Course 2 - Section 3
    { sectionId: section3.id, courseId: course2.id, title: 'Welcome to Unity', slug: 'welcome-unity', order: 1, isPreview: true, videoDuration: 12 },
    { sectionId: section3.id, courseId: course2.id, title: 'Unity Editor Tour', slug: 'unity-editor-tour', order: 2, isPreview: false, videoDuration: 25 },
    { sectionId: section3.id, courseId: course2.id, title: '2D vs 3D Development', slug: '2d-vs-3d', order: 3, isPreview: false, videoDuration: 18 },
  ];

  for (const lecture of lectures) {
    await prisma.lecture.create({
      data: lecture,
    });
  }

  console.log('✅ Created lectures');

  // Create enrollments
  await prisma.enrollment.createMany({
    data: [
      { studentId: studentUser1.id, courseId: course1.id, progress: 75 },
      { studentId: studentUser1.id, courseId: course2.id, progress: 40 },
      { studentId: studentUser2.id, courseId: course1.id, progress: 100, completedAt: new Date() },
      { studentId: studentUser2.id, courseId: course3.id, progress: 20 },
      { studentId: studentUser2.id, courseId: course4.id, progress: 55 },
    ],
  });

  console.log('✅ Created enrollments');

  // Create reviews
  await prisma.review.createMany({
    data: [
      { courseId: course1.id, studentId: studentUser1.id, rating: 5, comment: 'Excellent course! Very beginner-friendly.', isVerified: true },
      { courseId: course1.id, studentId: studentUser2.id, rating: 5, comment: 'Loved it! Now I\'m building my own games.', isVerified: true },
      { courseId: course2.id, studentId: studentUser1.id, rating: 4, comment: 'Great content, clear explanations.', isVerified: true },
      { courseId: course4.id, studentId: studentUser2.id, rating: 5, comment: 'Super helpful for marketing my game!', isVerified: true },
    ],
  });

  // Update course ratings
  await prisma.course.update({
    where: { id: course1.id },
    data: { rating: 5, totalReviews: 2, totalStudents: 2 },
  });

  await prisma.course.update({
    where: { id: course2.id },
    data: { rating: 4, totalReviews: 1, totalStudents: 1 },
  });

  await prisma.course.update({
    where: { id: course4.id },
    data: { rating: 5, totalReviews: 1, totalStudents: 1 },
  });

  console.log('✅ Created reviews');

  // Create quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      courseId: course1.id,
      title: 'Roblox Fundamentals Quiz',
      description: 'Test your knowledge of Roblox basics',
      passingScore: 70,
      maxAttempts: 3,
    },
  });

  // Create questions for quiz
  await prisma.question.createMany({
    data: [
      {
        quizId: quiz1.id,
        question: 'What programming language does Roblox use?',
        questionType: 'multiple_choice',
        options: ['Python', 'Luau', 'JavaScript', 'C#'],
        correctAnswer: '1',
        explanation: 'Roblox uses Luau, a custom version of Lua.',
        points: 1,
        order: 1,
      },
      {
        quizId: quiz1.id,
        question: 'What is the main tool for creating Roblox games?',
        questionType: 'multiple_choice',
        options: ['Unity', 'Roblox Studio', 'Unreal Engine', 'Blender'],
        correctAnswer: '1',
        explanation: 'Roblox Studio is the official development environment for Roblox games.',
        points: 1,
        order: 2,
      },
      {
        quizId: quiz1.id,
        question: 'True or False: Roblox games can only be played on PC.',
        questionType: 'true_false',
        options: ['True', 'False'],
        correctAnswer: '1',
        explanation: 'Roblox games can be played on PC, mobile, and Xbox.',
        points: 1,
        order: 3,
      },
    ],
  });

  console.log('✅ Created quizzes with questions');

  // Create contact messages
  await prisma.contactMessage.createMany({
    data: [
      { name: 'John Smith', email: 'john@example.com', subject: 'Question about courses', message: 'How do I get started?' },
      { name: 'Jane Doe', email: 'jane@example.com', subject: 'Partnership inquiry', message: 'I\'d like to discuss a partnership opportunity.' },
    ],
  });

  console.log('✅ Created contact messages');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log(`   Users: 6 (2 students, 3 instructors, 1 admin)`);
  console.log(`   Categories: 4`);
  console.log(`   Courses: 7 (6 published, 1 draft)`);
  console.log(`   Sections: 3`);
  console.log(`   Lectures: 14`);
  console.log(`   Enrollments: 5`);
  console.log(`   Reviews: 4`);
  console.log(`   Quizzes: 1 (with 3 questions)`);
  console.log('\n🔐 Test credentials:');
  console.log('   Admin: admin@gdevops.com / password123');
  console.log('   Instructor: alex@gdevops.com / password123');
  console.log('   Student: emily@student.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
