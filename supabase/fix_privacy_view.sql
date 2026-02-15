-- Secure Profiles Table - Fixed Version
-- 1. Create a secure view that EXCLUDES email.
-- Validated against schema: includes id, username, avatar_url, role, updated_at.
-- Excludes: bio, website, location, social_links, joined_at (not present in current schema).

CREATE OR REPLACE VIEW public.user_profiles_view AS
  SELECT 
    id, 
    username, 
    avatar_url, 
    COALESCE(role, 'user') as role, 
    updated_at
  FROM public.profiles;

-- 2. Grant access to the view
GRANT SELECT ON public.user_profiles_view TO anon, authenticated;

-- 3. (Optional) Comment explaining usage
COMMENT ON VIEW public.user_profiles_view IS 'Publicly accessible user profile data. query this view instead of "profiles" to avoid email leaks.';
