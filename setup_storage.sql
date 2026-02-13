-- Create a new storage bucket for article images
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true);

-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'article-images' );

-- Allow authenticated users to upload images
create policy "Authenticated Uploads"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'article-images' );

-- Allow authenticated users to update their own images (or all for admin simplicity)
create policy "Authenticated Updates"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'article-images' );

-- Allow authenticated users to delete images
create policy "Authenticated Deletes"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'article-images' );
