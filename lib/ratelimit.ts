import { createClient } from "@supabase/supabase-js";

// Initialize Service Role client specifically for rate limiting
// This bypasses RLS to read/write the rate_limits table via the secure RPC function.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        }
    }
);

/**
 * Checks if a request identifier has exceeded the rate limit.
 * @param identifier Unique key (e.g. "ip:1.2.3.4")
 * @param limit Max requests allowed
 * @param windowSeconds Time window in seconds
 * @returns true if allowed, false if blocked
 */
export async function checkRateLimit(identifier: string, limit: number = 5, windowSeconds: number = 60): Promise<boolean> {
    try {
        const { data, error } = await supabaseAdmin.rpc('check_rate_limit', {
            p_key: identifier,
            p_limit: limit,
            p_window_seconds: windowSeconds
        });

        if (error) {
            console.error("Rate limit error:", error);
            return true; // Fail open to avoid blocking legit users on DB error
        }

        return data as boolean;
    } catch (err) {
        console.error("Rate limit exception:", err);
        return true;
    }
}
