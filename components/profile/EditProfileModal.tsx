"use client";

import { User } from "@/types";
import { useState, useTransition } from "react";
import { updateProfile } from "@/app/actions/profile";
import { toast } from "sonner";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
    const [isPending, startTransition] = useTransition();

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await updateProfile(null, formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Profile updated!");
                onClose();
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 dark:border-dark-border flex justify-between items-center">
                    <h2 className="text-xl font-bold font-display">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form action={handleSubmit} className="p-6 space-y-4">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Display Name</label>
                            <input
                                name="name"
                                defaultValue={user.name}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                name="username"
                                defaultValue={user.username || user.email.split('@')[0]}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Bio</label>
                            <textarea
                                name="bio"
                                defaultValue={user.bio}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                name="location"
                                defaultValue={user.location}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website</label>
                            <input
                                name="website"
                                defaultValue={user.website}
                                placeholder="https://"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
                        <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Social Links</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="w-20 text-sm text-gray-500">Twitter</span>
                                <input
                                    name="twitter"
                                    defaultValue={user.social_links?.twitter}
                                    placeholder="@username"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-brand focus:border-brand outline-none text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-20 text-sm text-gray-500">Instagram</span>
                                <input
                                    name="instagram"
                                    defaultValue={user.social_links?.instagram}
                                    placeholder="@username"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-brand focus:border-brand outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-6 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg font-medium transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
