-- Comments System for 3AMSCROLL
-- Allows users to comment on articles

-- 1. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (length(content) >= 1 AND length(content) <= 1000),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

-- 3. Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if any
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'comments') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON comments';
    END LOOP;
END $$;

-- 5. Create RLS policies

-- Everyone can view comments
CREATE POLICY "Anyone can view comments" ON public.comments
    FOR SELECT
    USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Authenticated users can insert comments" ON public.comments
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments (or admins can delete any)
CREATE POLICY "Users can delete own comments" ON public.comments
    FOR DELETE
    TO authenticated
    USING (
        auth.uid() = user_id
        OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- 6. Create function to update comment count on articles
CREATE OR REPLACE FUNCTION update_article_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE articles 
        SET comments_count = COALESCE(comments_count, 0) + 1
        WHERE id = NEW.article_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE articles 
        SET comments_count = GREATEST(COALESCE(comments_count, 0) - 1, 0)
        WHERE id = OLD.article_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger
DROP TRIGGER IF EXISTS update_comment_count_trigger ON comments;
CREATE TRIGGER update_comment_count_trigger
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_article_comment_count();

-- 8. Add comments_count column to articles if it doesn't exist
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS comments_count INTEGER DEFAULT 0;

-- 9. Update existing articles to have correct comment counts
UPDATE articles
SET comments_count = (
    SELECT COUNT(*) 
    FROM comments 
    WHERE comments.article_id = articles.id
);
