import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const { email, token } = await request.json();
        const secretKeyRaw = process.env.TURNSTILE_SECRET_KEY || "";
        const isTurnstileEnabled = secretKeyRaw.length > 5 && !secretKeyRaw.includes("0x4AAAAAACdNDGBQtzQMzP5qyzNPZrVRwH4") && !secretKeyRaw.includes("your_secret_key_here");
        const secretKey = isTurnstileEnabled ? secretKeyRaw : undefined;

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        if (isTurnstileEnabled && !token) {
            return NextResponse.json({ success: false, error: "Captcha token is required" }, { status: 400 });
        }

        // 1. Validate Turnstile Token (if enabled)
        if (isTurnstileEnabled && token) {
            const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

            const res = await fetch(verifyEndpoint, {
                method: "POST",
                body: `secret=${encodeURIComponent(secretKeyRaw)}&response=${encodeURIComponent(token)}`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            });

            const data = await res.json();

            if (!data.success) {
                return NextResponse.json({ success: false, error: "Invalid captcha token" }, { status: 400 });
            }
        }

        // 2. Insert into Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase
            .from("newsletter_subscribers")
            .insert([{ email }]);

        if (error) {
            // Handle unique constraint violation gracefully
            if (error.code === '23505') {
                return NextResponse.json({ success: false, error: "This email is already subscribed!" }, { status: 400 });
            }
            console.error("Supabase insert error:", error);
            return NextResponse.json({ success: false, error: "Failed to subscribe. Try again later." }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Subscribed successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Newsletter API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
