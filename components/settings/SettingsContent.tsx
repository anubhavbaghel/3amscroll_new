"use client";

import { User } from "@/types";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { signout } from "@/app/auth/actions";
import Link from "next/link";
import {
    User as UserIcon,
    Settings,
    Moon,
    LogOut,
    ChevronRight,
    Shield,
    FileText,
    Bell
} from "lucide-react";

interface SettingsContentProps {
    user: User;
}

export function SettingsContent({ user }: SettingsContentProps) {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const SettingItem = ({
        icon: Icon,
        label,
        value,
        onClick,
        href,
        action
    }: {
        icon: any,
        label: string,
        value?: string,
        onClick?: () => void,
        href?: string,
        action?: React.ReactNode
    }) => {
        const content = (
            <div className={`flex items-center justify-between p-4 bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group ${onClick || href ? '' : 'cursor-default'}`}>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
                        {value && <p className="text-sm text-gray-500 dark:text-gray-400">{value}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {action}
                    {(onClick || href) && !action && (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    )}
                </div>
            </div>
        );

        if (href) {
            return <Link href={href} className="block">{content}</Link>;
        }

        return <div onClick={onClick}>{content}</div>;
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-display hidden lg:block">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
            </div>

            {/* Account Section */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Account</h2>
                <div className="space-y-2">
                    <SettingItem
                        icon={UserIcon}
                        label="Edit Profile"
                        value={user.name}
                        onClick={() => setIsEditProfileOpen(true)}
                    />
                    <SettingItem
                        icon={Settings}
                        label="Email Address"
                        value={user.email} // Read-only usually
                    />
                </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Preferences</h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg">
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Appearance</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode</p>
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                    <Link href="/notifications" className="block">
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg">
                                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">Notifications</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Support</h2>
                <div className="space-y-2">
                    <SettingItem
                        icon={Shield}
                        label="Privacy Policy"
                        href="/privacy"
                    />
                    <SettingItem
                        icon={FileText}
                        label="Terms of Service"
                        href="/terms"
                    />
                </div>
            </div>

            {/* Sign Out */}
            <form action={signout}>
                <button
                    type="submit"
                    className="w-full mt-8 p-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </form>

            <EditProfileModal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                user={user}
            />
        </div>
    );
}
