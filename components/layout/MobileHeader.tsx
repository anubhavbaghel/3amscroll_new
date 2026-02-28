"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { User } from "@supabase/supabase-js";
import { AuthButton } from "@/components/auth/AuthButton";
import { usePathname } from "next/navigation";
import { Settings, Bell } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface MobileHeaderProps {
    user?: User | null;
    role?: string | null;
}

export function MobileHeader({ user = null, role = null }: MobileHeaderProps) {
    const pathname = usePathname();
    const isProfilePage = pathname?.startsWith("/profile");
    const isSettingsPage = pathname?.startsWith("/settings");
    const isArticlePage = pathname?.startsWith("/article");

    if (isArticlePage) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border transition-colors lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
                {!isSettingsPage ? (
                    <div className="flex items-center gap-3 min-w-0">
                        <Logo variant="small" />
                    </div>
                ) : (
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                        Settings
                    </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            {/* Notification Icon - Always visible on mobile if logged in */}
                            <Link href="/notifications" aria-label="Notifications" className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand transition-colors">
                                <Bell className="w-6 h-6" />
                            </Link>

                            {/* Settings Icon - Only on Profile Page */}
                            {isProfilePage && (
                                <Link href="/settings" aria-label="Settings" className="p-2 text-gray-700 dark:text-gray-300 hover:text-brand transition-colors">
                                    <Settings className="w-6 h-6" />
                                </Link>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center">
                            <AuthButton user={user} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
