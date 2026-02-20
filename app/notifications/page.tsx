import { Bell } from "lucide-react";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
    title: "Notifications | 3AM SCROLL",
    description: "Your latest updates and interactions.",
};

export default async function NotificationsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-20 pb-24">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold font-display mb-8">Notifications</h1>

                <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-12 text-center border border-gray-100 dark:border-dark-border">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No notifications yet</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                        When you get followers or other updates, they'll show up here.
                    </p>
                </div>
            </div>
        </div>
    );
}
