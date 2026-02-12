-- Phase 5: Schema Updates for Content Automation

-- 1. Add 'status' column to articles
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published' 
CHECK (status IN ('draft', 'published', 'archived'));

-- 2. Add 'source_url' for RSS attribution
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS source_url text;

-- 3. Create index on status for faster filtering in Admin Dashboard
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);

-- 4. Update RLS policies to only show PUBLISHED articles to public
DROP POLICY IF EXISTS "Articles are viewable by everyone." ON public.articles;

CREATE POLICY "Published articles are viewable by everyone."
ON public.articles FOR SELECT
USING ( status = 'published' );

-- 5. Allow Admins to view ALL articles (Drafts included)
-- For simplicity in this MVP, we allow authenticated users to view drafts if they are the author 
-- OR if we implement an admin role. 
-- For now, let's allow "authenticated" users to see all (so you can see drafts in Admin panel)
CREATE POLICY "Authenticated users can see all articles (including drafts)"
ON public.articles FOR SELECT
TO authenticated
USING ( true );

-- 6. Allow Authenticated users to INSERT/UPDATE (for RSS script / Admin)
-- Ideally this should be restricted to Admin ID, but for MVP:
CREATE POLICY "Authenticated users can insert articles"
ON public.articles FOR INSERT
TO authenticated
WITH CHECK ( true );

CREATE POLICY "Authenticated users can update articles"
ON public.articles FOR UPDATE
TO authenticated
USING ( true );

CREATE POLICY "Authenticated users can delete articles"
ON public.articles FOR DELETE
TO authenticated
USING ( true );
