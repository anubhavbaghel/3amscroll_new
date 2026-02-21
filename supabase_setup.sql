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
    read_time int,
    views int default 0,
    created_at timestamp with time zone default now()
);
