-- Promote specific user to Admin
-- Replace 'YOUR_USER_ID' with your actual Supabase User ID (found in Authentication > Users)
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'YOUR_USER_ID';
