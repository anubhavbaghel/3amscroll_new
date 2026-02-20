"use client";

import { useState, useTransition } from "react";
import { createComment, deleteComment } from "@/app/actions/comment";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    user: {
        name: string;
        avatar: string;
    };
}

interface CommentsProps {
    articleId: string;
    initialComments: Comment[];
    currentUserId?: string;
}

export function Comments({ articleId, initialComments, currentUserId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!newComment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        startTransition(async () => {
            const result = await createComment(articleId, newComment);

            if (result.error) {
                setError(result.error);
                if (result.error.includes("logged in")) {
                    router.push("/login");
                }
            } else if (result.comment) {
                setComments([result.comment, ...comments]);
                setNewComment("");
            }
        });
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        startTransition(async () => {
            const result = await deleteComment(commentId);

            if (result.error) {
                setError(result.error);
            } else {
                setComments(comments.filter(c => c.id !== commentId));
            }
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={currentUserId ? "Write a comment..." : "Sign in to comment"}
                    disabled={!currentUserId || isPending}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                    rows={3}
                    maxLength={1000}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        {newComment.length}/1000
                    </span>
                    <button
                        type="submit"
                        disabled={!currentUserId || isPending || !newComment.trim()}
                        className="px-6 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Posting..." : "Post Comment"}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-700 dark:text-gray-400 text-center py-8">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 rounded-lg bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-3">
                                <Image
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <p className="font-semibold text-sm">
                                                {comment.user.name}
                                            </p>
                                            <p className="text-xs text-gray-700 dark:text-gray-500">
                                                {formatDate(comment.created_at)}
                                            </p>
                                        </div>
                                        {currentUserId === comment.user_id && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                disabled={isPending}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
