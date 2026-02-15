"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function validateTurnstile(token: string | null) {
    if (!token) return false;

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
        console.error("TURNSTILE_SECRET_KEY is not set");
        return true; // Fail open if config is missing to avoid blocking users
    }

    try {
        const formData = new FormData();
        formData.append('secret', secretKey);
        formData.append('response', token);
        // formData.append('remoteip', request.ip); // Optional but recommended if we had access to request IP

        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });

        const outcome = await result.json();
        return outcome.success;
    } catch (e) {
        console.error("Turnstile validation error:", e);
        return true; // Fail open on network error
    }
}

export async function login(formData: FormData) {
    const supabase = await createClient();
    const redirectTo = formData.get("redirectTo") as string || "/";

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const token = formData.get("turnstileToken") as string;
    if (!(await validateTurnstile(token))) {
        return redirect(`/login?error=${encodeURIComponent("Invalid captcha")}`);
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        // If we came from a specific page (like admin login), we want to return there with the error
        if (redirectTo.includes("/admin")) {
            return redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
        }
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect(redirectTo);
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: formData.get("fullName") as string,
            }
        }
    };

    const token = formData.get("turnstileToken") as string;
    if (!(await validateTurnstile(token))) {
        return redirect(`/signup?error=${encodeURIComponent("Invalid captcha")}`);
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.error("Signup error:", error);
        return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath("/", "layout");
    redirect("/login?message=Account created successfully. Please sign in.");
}

export async function signout() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/");
}

export async function loginWithState(formData: FormData) {
    const supabase = await createClient();
    const redirectTo = formData.get("redirectTo") as string || "/";

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const token = formData.get("turnstileToken") as string;
    if (!(await validateTurnstile(token))) {
        return { success: false, error: "Invalid captcha" };
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true, redirectTo };
}
