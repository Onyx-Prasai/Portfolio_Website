-- 1. Create Tables

-- Conferences
CREATE TABLE conferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    date TEXT,
    description TEXT,
    link TEXT
);

-- Education
CREATE TABLE educations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT
);

-- Experience
CREATE TABLE experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT NOT NULL,
    organization TEXT
);

-- Projects
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    github_link TEXT,
    demo_link TEXT,
    image TEXT
);

-- Skills
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level INTEGER CHECK (level >= 1 AND level <= 100),
    icon TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Public Read Access for everyone
CREATE POLICY "Public Read Access" ON conferences FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON educations FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON skills FOR SELECT USING (true);

-- Admin Access (Insert, Update, Delete)
-- This policy assumes authenticated users are admins. 
-- In a more complex app, you'd check for a specific role or UID.
CREATE POLICY "Admin CRUD Access" ON conferences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access" ON educations FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access" ON experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD Access" ON skills FOR ALL TO authenticated USING (true);
