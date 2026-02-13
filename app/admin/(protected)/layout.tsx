import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        // If logged in but not admin, maybe redirect to logic with error
        // For now, force them to the admin login (which might show they are logged in as user, 
        // but since auth is shared, they are technically logged in. 
        // We probably want to sign them out or show "Access Denied" page.
        // Simplest for now: Redirect to admin login with error
        redirect("/admin/login?error=Access Denied: You are not an admin.");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            {children}
        </div>
    );
}
