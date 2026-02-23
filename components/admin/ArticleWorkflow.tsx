"use client";

import {
    Check,
    Clock,
    Edit2,
    Rocket,
    FileText,
    Layout,
    Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ArticleWorkflowProps {
    article: {
        id: string;
        title: string;
        status: string;
        cover_image?: string;
        created_at: string;
    };
    onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function ArticleWorkflow({ article, onUpdateStatus }: ArticleWorkflowProps) {
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const router = useRouter();

    const handleAction = async (actionId: string, fn: () => Promise<any>) => {
        setLoadingAction(actionId);
        try {
            const res = await fn();
            if (res.error) throw new Error(res.error);
            toast.success(`${actionId.charAt(0).toUpperCase() + actionId.slice(1)} complete! ✨`);
            router.refresh();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoadingAction(null);
        }
    };

    const stages = [
        {
            id: 'drafting',
            label: 'Drafting',
            icon: Edit2,
            isComplete: true,
            detail: 'Content written',
            action: (
                <Link href={`/admin/articles/${article.id}/edit`} className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline mt-2">
                    <FileText className="w-3 h-3" />
                    Edit Content
                </Link>
            )
        },
        {
            id: 'review',
            label: 'Review',
            icon: Layout,
            isComplete: article.status !== 'draft',
            detail: article.status !== 'draft' ? 'Review complete' : 'Waiting for review',
            action: null
        },
        {
            id: 'publish',
            label: 'Publication',
            icon: Rocket,
            isComplete: article.status === 'published',
            detail: article.status === 'published' ? 'Live on website' : 'Finalize & Post',
            action: article.status !== 'published' ? (
                <button
                    onClick={() => handleAction('publish', () => onUpdateStatus(article.id, 'published'))}
                    disabled={!!loadingAction}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded-lg text-[10px] font-bold mt-2 transition-all disabled:opacity-50"
                >
                    <Rocket className="w-3 h-3" />
                    Post Live
                </button>
            ) : (
                <Link
                    href={`/article/${article.id}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-[10px] font-bold mt-2 transition-all"
                >
                    <Eye className="w-3 h-3" />
                    View Live
                </Link>
            )
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group/workflow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover/workflow:bg-primary/10 transition-colors" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
                <div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white leading-tight">
                        {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        Created {new Date(article.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        article.status === 'published'
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                        {article.status}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {stages.map((stage) => (
                        <div key={stage.id} className="flex md:flex-col items-start md:items-center gap-4 group">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 border-2",
                                stage.isComplete
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110"
                                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400"
                            )}>
                                {stage.isComplete ? (
                                    <Check className="w-5 h-5 stroke-[3]" />
                                ) : (
                                    <stage.icon className="w-5 h-5" />
                                )}
                            </div>

                            <div className="md:text-center w-full">
                                <p className={cn(
                                    "text-xs font-bold leading-tight",
                                    stage.isComplete ? "text-slate-900 dark:text-white" : "text-slate-400"
                                )}>
                                    {stage.label}
                                </p>
                                <p className="text-[9px] text-slate-500 mt-0.5 max-w-[120px] md:mx-auto line-clamp-1">
                                    {stage.detail}
                                </p>
                                <div className="hidden md:block">
                                    {stage.action}
                                </div>
                            </div>

                            <div className="md:hidden ml-auto">
                                {stage.action}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
