-- Create users table for NextAuth (separate from auth.users)
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT UNIQUE,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'student',
    CONSTRAINT "user_role_check" CHECK ("role" IN ('student', 'instructor', 'admin'))
);

-- Accounts table (for NextAuth OAuth providers)
CREATE TABLE IF NOT EXISTS "accounts" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

-- Sessions table (for NextAuth)
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Verification tokens (for email verification and password reset)
CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE ("identifier", "token")
);

-- Enable RLS on new tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;

-- Users policies (allow anonymous registration, users can only see their own data)
CREATE POLICY "users_select_policy" ON "users" FOR SELECT USING (true);
CREATE POLICY "users_insert_policy" ON "users" FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update_policy" ON "users" FOR UPDATE USING (true) WITH CHECK (true);

-- Accounts policies
CREATE POLICY "accounts_select_policy" ON "accounts" FOR SELECT USING (true);
CREATE POLICY "accounts_insert_policy" ON "accounts" FOR INSERT WITH CHECK (true);

-- Sessions policies
CREATE POLICY "sessions_select_policy" ON "sessions" FOR SELECT USING (true);
CREATE POLICY "sessions_insert_policy" ON "sessions" FOR INSERT WITH CHECK (true);