-- FIX: Drop the recursive policy
-- The "Admins can view all profiles" policy causes infinite recursion because 
-- it queries the 'profiles' table to check the 'role', which triggers the policy again.

-- 1. Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- 2. Verify: Ensure the public policy still exists (from setup)
-- This policy allows everyone to view profiles, which is sufficient for now.
-- IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by everyone.') THEN
--     create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
-- END IF;
