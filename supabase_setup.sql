-- 1. Create PROFILES table (Public profiles for users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  username text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );


-- 2. Create ARTICLES table
create table public.articles (
    id uuid default gen_random_uuid() primary key,
    slug text not null unique,
    title text not null,
    excerpt text,
    content text, -- HTML or Markdown content
    cover_image text,
    category text,
    author_id text, -- For now, we keep the string IDs from mock data, or we can map to real users later
    author_name text,
    author_avatar text,
    published_at timestamp with time zone default now(),
    read_time int,
    views int default 0,
    likes_count int default 0,
    created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.articles enable row level security;

-- Policies for Articles
create policy "Articles are viewable by everyone."
  on articles for select
  using ( true );

-- (Optional) Policy for admin inserts - for now we allow manual inserts via dashboard


-- 3. Create BOOKMARKS table
create table public.bookmarks (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    article_id uuid references public.articles(id) not null,
    created_at timestamp with time zone default now(),
    unique(user_id, article_id)
);

-- Enable RLS
alter table public.bookmarks enable row level security;

-- Policies for Bookmarks
create policy "Users can view their own bookmarks."
  on bookmarks for select
  using ( auth.uid() = user_id );

create policy "Users can create their own bookmarks."
  on bookmarks for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own bookmarks."
  on bookmarks for delete
  using ( auth.uid() = user_id );


-- 4. INSERT MOCK DATA (High Quality Production Data)
INSERT INTO public.articles (slug, title, excerpt, content, cover_image, category, author_id, author_name, author_avatar, published_at, read_time, views, likes_count)
VALUES 
(
    'future-of-ai-wearables',
    'The Future of AI Wearables: Beyond Smartwatches',
    'How artificial intelligence is transforming wearable technology from simple trackers to proactive health guardians and personal assistants.',
    '<p>Wearable technology is evolving...</p>', 
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'Tech',
    'author-1', 'Sarah Chen', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    NOW() - INTERVAL '2 days',
    5,
    12500,
    450
),
(
    'minimalist-workspace-guide',
    'Creating the Ultimate Minimalist Workspace',
    'A comprehensive guide to decluttering your physical and digital space for maximum productivity and mental clarity.',
    '<p>A cluttered desk is a cluttered mind...</p>',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
    'Productivity',
    'author-2', 'Mark Davis', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    NOW() - INTERVAL '5 days',
    8,
    8900,
    320
),
(
    'urban-photography-tips',
    'Urban Photography: Capturing the Soul of the City',
    'Master the art of street photography with these essential tips for composition, lighting, and storytelling in urban environments.',
    '<p>The city never sleeps...</p>',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    'Creative',
    'author-3', 'Emma Wilson', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    NOW() - INTERVAL '1 week',
    6,
    6700,
    210
),
(
    'sustainable-living-2024',
    'Sustainable Living Trends for 2025',
    'From zero-waste kitchens to renewable energy tech, here are the most impactful ways to reduce your carbon footprint this year.',
    '<p>Sustainability is not just a trend...</p>',
    'https://images.unsplash.com/photo-1518005052304-a32d180425f5',
    'Lifestyle',
    'author-4', 'Alex Morgan', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    NOW() - INTERVAL '3 days',
    7,
    5400,
    180
),
(
    'digital-detox-challenge',
    'The 30-Day Digital Detox Challenge',
    'Reclaim your time and attention span with this structured program designed to help you build a healthier relationship with technology.',
    '<p>We are addicted to our screens...</p>',
    'https://images.unsplash.com/photo-1511649475669-e288648b2339',
    'Wellness',
    'author-5', 'Jessica Kim', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    NOW() - INTERVAL '1 day',
    10,
    15000,
    600
),
(
    'remote-work-culture',
    'Building a Thriving Remote Work Culture',
    'Strategies for leaders and teams to maintain connection, collaboration, and morale in a distributed work environment.',
    '<p>Remote work is here to stay...</p>',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    'Business',
    'author-6', 'David Miller', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    NOW() - INTERVAL '12 hours',
    6,
    4200,
    150
);
