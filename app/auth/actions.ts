"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();
    const redirectTo = formData.get("redirectTo") as string || "/";

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

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

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true, redirectTo };
}
