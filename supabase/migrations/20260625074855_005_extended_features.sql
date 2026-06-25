-- Learning Outcomes
CREATE TABLE IF NOT EXISTS learning_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lecture Progress (references lessons table)
CREATE TABLE IF NOT EXISTS lecture_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  watch_time INT DEFAULT 0,
  last_position INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lecture_id, enrollment_id)
);

-- Forum Categories
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES forum_categories(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  reply_count INT DEFAULT 0,
  last_reply_at TIMESTAMPTZ,
  last_reply_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post Replies
CREATE TABLE IF NOT EXISTS post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES post_replies(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  like_count INT DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Feedback (Platform-wide)
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  is_read BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by VARCHAR(255),
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  rating INT DEFAULT 5,
  is_published BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  source VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default forum categories
INSERT INTO forum_categories (name, slug, description, color, order_index) VALUES
('General Discussion', 'general', 'Talk about anything game development related', '#8B5CF6', 1),
('Help & Support', 'help-support', 'Get help with courses and platform issues', '#EF4444', 2),
('Showcase', 'showcase', 'Share your game projects and get feedback', '#10B981', 3),
('Roblox Development', 'roblox', 'Discuss Roblox game development', '#3B82F6', 4),
('Unity Development', 'unity', 'Discuss Unity game development', '#F59E0B', 5),
('Unreal Engine', 'unreal-engine', 'Discuss Unreal Engine development', '#EC4899', 6),
('Game Design', 'game-design', 'Discuss game design principles and ideas', '#06B6D4', 7)
ON CONFLICT (slug) DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, role, content, avatar_url, rating, is_published, order_index) VALUES
('Alex Chen', 'Indie Game Developer', 'G Dev OPS transformed my game development skills. I went from a complete beginner to publishing my first Roblox game in just 3 months!', 
 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 5, true, 1),
('Maria Santos', 'Unity Developer', 'The Unity courses are incredibly well-structured. The hands-on projects helped me land my dream job at a game studio.', 
 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', 5, true, 2),
('James Wilson', 'Game Design Student', 'Best investment I ever made. The community support and instructor feedback made all the difference in my learning journey.', 
 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', 5, true, 3)
ON CONFLICT DO NOTHING;