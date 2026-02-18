"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function NewsletterForm() {
    const [token, setToken] = useState<string>("");

    return (
        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if (token) alert("Subscribed!"); else alert("Please solve captcha"); }}>
            <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="flex justify-start">
                <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setToken(token)}
                    onError={() => setToken("")}
                    onExpire={() => setToken("")}
                    options={{
                        theme: "auto",
                        size: "compact",
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!token}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Subscribe
            </button>
        </form>
    );
}
