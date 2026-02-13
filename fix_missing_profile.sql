-- FIX: Backfill profiles for existing users
-- 1. Insert profiles for users who exist in auth.users but not in public.profiles
INSERT INTO public.profiles (id, email, username, role)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', email), 
    'admin' -- Promote to admin immediately to fix access
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. Verify the result
SELECT * FROM public.profiles;
