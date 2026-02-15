"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [token, setToken] = useState<string>("");
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("Please complete the captcha.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        if (formData.get("_gotcha")) {
            // Honeypot trap
            setIsSuccess(true);
            return;
        }

        // Simulate API call with validation
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Reset turnstile after submission
        if (turnstileRef.current) {
            turnstileRef.current.reset();
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 text-center border border-green-100 dark:border-green-800">
                <div className="inline-flex p-3 bg-green-100 dark:bg-green-800 rounded-full mb-4 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                >
                    <option>General Inquiry</option>
                    <option>Editorial Pitch</option>
                    <option>Partnership</option>
                    <option>Report a Bug</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Tell us what&apos;s on your mind..."
                />
            </div>

            {/* Honeypot Field - Hidden from humans */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            {/* Turnstile Captcha */}
            <div className="flex justify-start mb-6">
                <Turnstile
                    ref={turnstileRef}
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
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="w-5 h-5" />
                    </>
                )}
            </button>
        </form>
    );
}
