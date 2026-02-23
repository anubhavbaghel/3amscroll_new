"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function NewsletterForm() {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const isTurnstileEnabled = !!siteKey && siteKey.length > 5;

    const [token, setToken] = useState<string>(isTurnstileEnabled ? "" : "skipped");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessage("Please complete the captcha.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Subscribed successfully!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to subscribe.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <form className="space-y-2" onSubmit={handleSubscribe}>
            {status === "success" ? (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-lg border border-green-200 dark:border-green-800/30">
                    {message}
                </div>
            ) : (
                <>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                        disabled={status === "loading"}
                    />
                    {isTurnstileEnabled && (
                        <div className="flex justify-center min-h-[65px] items-center">
                            <Turnstile
                                siteKey={siteKey}
                                onSuccess={(token) => setToken(token)}
                                onError={() => setToken("")}
                                onExpire={() => setToken("")}
                            />
                        </div>
                    )}
                    {status === "error" && (
                        <p className="text-red-500 text-xs">{message}</p>
                    )}
                    <button
                        type="submit"
                        disabled={!token || status === "loading" || !email}
                        className="w-full px-4 py-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {status === "loading" ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : !email ? (
                            "Enter email"
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </>
            )}
        </form>
    );
}
