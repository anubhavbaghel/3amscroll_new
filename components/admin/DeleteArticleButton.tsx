"use client";

import { deleteArticle } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteArticleButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
            startTransition(async () => {
                try {
                    await deleteArticle(id);
                    toast.success("Article deleted successfully");
                    // Redirect is handled by server action
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to delete article");
                }
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 dark:bg-transparent dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
        >
            <Trash2 className="w-4 h-4" />
            {isPending ? "Deleting..." : "Delete Article"}
        </button>
    );
}
