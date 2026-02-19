const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://edzljmkauuncnfskghpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkemxqbWthdXVuY25mc2tnaHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDcyMjcsImV4cCI6MjA4NjQ4MzIyN30.vO42b7MulclV8Q_pkMZxReat2jIwqyZbqUt0Uzfio80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConstraints(articleId) {
    console.log(`Checking constraints for article: ${articleId}`);

    const { count: comments } = await supabase.from('comments').select('*', { count: 'exact', head: true }).eq('article_id', articleId);
    const { count: likes } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('article_id', articleId);
    const { count: bookmarks } = await supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('article_id', articleId);

    console.log({ comments, likes, bookmarks });
}

// Check first article from previous list as example
const exampleId = 'e4df519b-8eac-4b81-9482-35330a4a5aa0';
checkConstraints(exampleId);
