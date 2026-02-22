-- RBAC Migration: Adding Editor, Writer, and Growth roles

-- 1. Update profiles.role CHECK constraint
-- Note: PostgreSQL doesn't allow direct modification of CHECK constraints. 
-- We drop and recreate it.
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'admin', 'editor', 'writer', 'growth'));

-- 2. Update Articles RLS for Editors
-- Editors should have full CRUD on all articles
DROP POLICY IF EXISTS "Editors can manage all articles" ON public.articles;
CREATE POLICY "Editors can manage all articles"
ON public.articles FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'editor')
    )
);

-- 3. Ensure Writers can only see their own articles in select/update
-- (Existing policies might already cover this, but let's be explicit)
DROP POLICY IF EXISTS "Users can manage their own articles" ON public.articles;
CREATE POLICY "Users can manage their own articles"
ON public.articles FOR ALL
TO authenticated
USING (
    author_uuid = auth.uid()
);

-- Note: 'Published articles are viewable by everyone' remains as is.
