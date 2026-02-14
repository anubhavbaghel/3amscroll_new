-- Add status and new author columns to articles table
-- This enables user-generated content with draft/published workflow
-- NOTE: The existing author_id is TEXT (for legacy mock data)
-- We'll add a new author_uuid column for real user references

-- Step 1: Add new columns
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published'));

-- Add new UUID column for real user authors (separate from legacy TEXT author_id)
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS author_uuid UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Step 2: Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_author_uuid ON articles(author_uuid);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_author_status ON articles(author_uuid, status);

-- Step 3: Drop ALL existing policies on articles table
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'articles') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON articles';
    END LOOP;
END $$;

-- Step 4: Create new RLS policies

-- Allow everyone to view published articles, and users to view their own drafts
CREATE POLICY "View published or own articles" ON articles
    FOR SELECT
    USING (
        status = 'published' 
        OR 
        author_uuid = auth.uid()
    );

-- Allow authenticated users to insert their own articles
CREATE POLICY "Users can insert their own articles" ON articles
    FOR INSERT
    TO authenticated
    WITH CHECK (author_uuid = auth.uid());

-- Allow users to update their own articles (or admins can update any)
CREATE POLICY "Users can update their own articles" ON articles
    FOR UPDATE
    TO authenticated
    USING (
        author_uuid = auth.uid()
        OR 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Allow users to delete their own articles (or admins can delete any)
CREATE POLICY "Users can delete their own articles" ON articles
    FOR DELETE
    TO authenticated
    USING (
        author_uuid = auth.uid()
        OR 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Step 5: Ensure RLS is enabled
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
