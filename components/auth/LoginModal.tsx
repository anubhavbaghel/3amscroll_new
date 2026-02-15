"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { loginWithState } from "@/app/auth/actions";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    redirectTo?: string;
}

export function LoginModal({ isOpen, onClose, redirectTo = "/write" }: LoginModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // Close on click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        // Append redirect URL
        formData.append("redirectTo", redirectTo);
        formData.append("turnstileToken", token);

        if (!token) {
            setError("Please complete the captcha.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await loginWithState(formData);

            if (!result.success && result.error) {
                setError(result.error);
                setIsLoading(false);
            } else if (result.success && result.redirectTo) {
                // Successful login
                onClose();
                router.push(result.redirectTo);
                router.refresh(); // Ensure auth state updates
            }
        } catch (e) {
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    }

    if (!isMounted || !isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative px-6 pt-6 pb-2 text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-gray-100">
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sign in to continue writing
                    </p>
                </div>

                {/* Body */}
                <div className="p-6 pt-2">
                    {/* Google Auth */}
                    <div className="mt-4">
                        <GoogleSignInButton redirectTo={redirectTo} />
                    </div>

                    <div className="relative mt-6 mb-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white dark:bg-black px-4 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form action={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6 bg-transparent"
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-lg border-0 py-2.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6 bg-transparent"
                                placeholder="Password"
                            />
                        </div>

                        {/* Turnstile Captcha */}
                        <div className="flex justify-center mb-4">
                            <Turnstile
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                onSuccess={(token) => setToken(token)}
                                onError={() => setToken("")}
                                onExpire={() => setToken("")}
                                options={{
                                    theme: "auto",
                                    size: "flexible",
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-lg bg-brand px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" onClick={onClose} className="font-semibold text-brand hover:text-brand-dark">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}
