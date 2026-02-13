-- FIX: Article Permissions
-- It seems the "Phase 5" policies might not have been applied, preventing you from creating articles.
-- Running this script will ensure Admins have full access.

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 1. INSERT Policy (Required for "Create Article")
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON public.articles;
CREATE POLICY "Authenticated users can insert articles"
ON public.articles FOR INSERT
TO authenticated
WITH CHECK ( true );

-- 2. UPDATE Policy (Required for "Edit Article")
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
CREATE POLICY "Authenticated users can update articles"
ON public.articles FOR UPDATE
TO authenticated
USING ( true );

-- 3. DELETE Policy
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.articles;
CREATE POLICY "Authenticated users can delete articles"
ON public.articles FOR DELETE
TO authenticated
USING ( true );

-- 4. SELECT Policy (Admins see everything)
DROP POLICY IF EXISTS "Authenticated users can see all articles (including drafts)" ON public.articles;
CREATE POLICY "Authenticated users can see all articles (including drafts)"
ON public.articles FOR SELECT
TO authenticated
USING ( true );

-- 5. SELECT Policy (Public sees only published)
-- Remove old potential conflicting policies
DROP POLICY IF EXISTS "Articles are viewable by everyone." ON public.articles;
DROP POLICY IF EXISTS "Published articles are viewable by everyone." ON public.articles;

-- Re-create public view policy
CREATE POLICY "Published articles are viewable by everyone."
ON public.articles FOR SELECT
TO public
USING ( status = 'published' );
