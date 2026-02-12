-- Create LIKES table for user engagement
create table public.likes (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    article_id uuid references public.articles(id) not null,
    created_at timestamp with time zone default now(),
    unique(user_id, article_id)
);

-- Enable RLS
alter table public.likes enable row level security;

-- Policies
create policy "Users can view their own likes"
  on likes for select
  using ( auth.uid() = user_id );

create policy "Users can toggle their own likes"
  on likes for insert
  with check ( auth.uid() = user_id );

create policy "Users can remove their own likes"
  on likes for delete
  using ( auth.uid() = user_id );
