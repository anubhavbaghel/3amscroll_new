-- Resilient script to fix article deletion by adding "ON DELETE CASCADE"
-- This version safely skips tables that don't exist yet (like comments).

DO $$ 
BEGIN
    -- 1. Fix LIKES table constraint
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'likes') THEN
        ALTER TABLE public.likes DROP CONSTRAINT IF EXISTS likes_article_id_fkey;
        ALTER TABLE public.likes ADD CONSTRAINT likes_article_id_fkey 
            FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;
    END IF;

    -- 2. Fix BOOKMARKS table constraint
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookmarks') THEN
        ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_article_id_fkey;
        ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_article_id_fkey 
            FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;
    END IF;

    -- 3. Fix COMMENTS table constraint (only if it exists)
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'comments') THEN
        ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_article_id_fkey;
        ALTER TABLE public.comments ADD CONSTRAINT comments_article_id_fkey 
            FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Success! You can now delete articles even if they have likes or bookmarks.
