-- Rate Limiting System for 3AMSCROLL
-- Simple DB-backed rate limiter to prevent abuse on public APIs

-- 1. Create table for tracking requests
CREATE TABLE IF NOT EXISTS public.rate_limits (
    key text PRIMARY KEY, -- e.g. "ip:127.0.0.1:contact_form"
    count int DEFAULT 1,
    last_request timestamp with time zone DEFAULT now()
);

-- Enable RLS (though only Service Role should write to this)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- 2. Create RPC function to check and increment limit
-- Returns TRUE if request is allowed, FALSE if limit exceeded
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_key text,
    p_limit int,
    p_window_seconds int
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER -- Runs as database owner to bypass RLS for the robust check
AS $$
DECLARE
    v_count int;
    v_last_request timestamp with time zone;
BEGIN
    -- Check if record exists
    SELECT count, last_request INTO v_count, v_last_request
    FROM public.rate_limits
    WHERE key = p_key;

    IF NOT FOUND THEN
        -- New record
        INSERT INTO public.rate_limits (key, count, last_request)
        VALUES (p_key, 1, now());
        RETURN TRUE;
    END IF;

    -- Check if window has passed
    IF now() > v_last_request + (p_window_seconds || ' seconds')::interval THEN
        -- Reset count
        UPDATE public.rate_limits
        SET count = 1, last_request = now()
        WHERE key = p_key;
        RETURN TRUE;
    ELSE
        -- Within window, check limit
        IF v_count >= p_limit THEN
            RETURN FALSE; -- Limit exceeded
        ELSE
            -- Increment
            UPDATE public.rate_limits
            SET count = count + 1, last_request = now()
            WHERE key = p_key;
            RETURN TRUE;
        END IF;
    END IF;
END;
$$;

-- Grant execute to anon/authenticated so API can call it (via Service Role usually, but RPC is safe-ish if key is managed)
-- Actually, strict security would be REVOKE EXECUTE from public, and only allow Service Role.
-- But for Client-Side rate limiting (e.g. from a Server Action or Edge Function), we might need it.
-- Let's stick to Service Role usage in `route.ts`.
GRANT EXECUTE ON FUNCTION public.check_rate_limit TO service_role;
