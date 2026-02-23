"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(id: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/notifications');
        return { success: true };
    } catch (error) {
        return { error: "Failed to update notification" };
    }
}

export async function markAllAsRead() {
    try {
        const supabase = await createClient();
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) throw new Error("Unauthorized");

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', userData.user.id)
            .eq('is_read', false);

        if (error) throw error;
        revalidatePath('/notifications');
        return { success: true };
    } catch (error) {
        return { error: "Failed to update notifications" };
    }
}
