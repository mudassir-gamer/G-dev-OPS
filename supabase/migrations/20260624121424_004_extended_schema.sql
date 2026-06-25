-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS trailer_url TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS discount_price DECIMAL(10,2);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_lectures INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Add missing columns to enrollments
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS completed_lectures INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS total_watch_time INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS certificate_issued BOOLEAN DEFAULT false;

-- Add missing columns to lectures
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS section_id UUID REFERENCES sections(id) ON DELETE SET NULL;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS attachments TEXT[] DEFAULT '{}';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS transcript TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lecture_type TEXT DEFAULT 'video';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content TEXT;

-- Add missing columns to reviews
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS helpful_count INTEGER DEFAULT 0;

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lecture_id UUID REFERENCES lessons(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id UUID NOT NULL,
    parent_id UUID REFERENCES comments(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT false,
    is_highlighted BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    time_limit INTEGER,
    passing_score INTEGER DEFAULT 70,
    max_attempts INTEGER DEFAULT 3,
    shuffle_questions BOOLEAN DEFAULT true,
    show_results BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    question TEXT NOT NULL,
    question_type TEXT DEFAULT 'multiple_choice',
    options TEXT[] DEFAULT '{}',
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    "order" INTEGER DEFAULT 0,
    image_url TEXT,
    code_snippet TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id TEXT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    time_spent INTEGER DEFAULT 0,
    is_passed BOOLEAN NOT NULL,
    attempt_number INTEGER NOT NULL,
    answers JSONB,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    enrollment_id UUID UNIQUE REFERENCES enrollments(id) ON DELETE SET NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expiry_date TIMESTAMP WITH TIME ZONE,
    is_valid BOOLEAN DEFAULT true,
    verified_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id TEXT NOT NULL,
    to_user_id TEXT NOT NULL,
    course_id UUID,
    rating INTEGER,
    feedback_type TEXT DEFAULT 'general',
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sections_course_id ON sections(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_section_id ON lessons(section_id);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON lessons(slug);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_comments_lecture_id ON comments(lecture_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_course_id ON quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_certificates_enrollment_id ON certificates(enrollment_id);