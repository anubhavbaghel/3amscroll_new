-- Add SEO columns to articles table
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS focus_keyword TEXT,
ADD COLUMN IF NOT EXISTS cover_image_alt TEXT;

-- Create index for focus_keyword to support future search/filtering
CREATE INDEX IF NOT EXISTS idx_articles_focus_keyword ON articles(focus_keyword);
