import { createClient } from "@/lib/supabase/server";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingWriteButton } from "@/components/write/FloatingWriteButton";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const switzer = localFont({
    src: [
        { path: "./fonts/switzer-400.woff2", weight: "400", style: "normal" },
        { path: "./fonts/switzer-500.woff2", weight: "500", style: "normal" },
        { path: "./fonts/switzer-600.woff2", weight: "600", style: "normal" },
        { path: "./fonts/switzer-700.woff2", weight: "700", style: "normal" },
        { path: "./fonts/switzer-800.woff2", weight: "800", style: "normal" },
    ],
    variable: "--font-switzer",
    display: "swap",
});

const clashDisplay = localFont({
    src: [
        { path: "./fonts/clash-display-600.woff2", weight: "600", style: "normal" },
        { path: "./fonts/clash-display-700.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-clash-display",
    display: "swap",
});

const isDev = process.env.NODE_ENV === 'development';
const siteUrl = isDev ? "http://localhost:3000" : (process.env.NEXT_PUBLIC_SITE_URL || "https://3amscroll.com");

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "3AM SCROLL - Your Late-Night Scroll Companion",
        template: "%s | 3AM SCROLL"
    },
    description: "News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more. Fresh perspectives on what matters to the sleepless generation.",
    keywords: [
        "Gen Z news",
        "tech articles",
        "gaming news",
        "entertainment",
        "lifestyle",
        "finance",
        "career advice",
        "3AM SCROLL",
        "late night reading",
        "trending stories"
    ],
    authors: [{ name: "3AM SCROLL Team" }],
    creator: "3AM SCROLL",
    publisher: "3AM SCROLL",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: '3AM SCROLL',
        title: '3AM SCROLL - Your Late-Night Scroll Companion',
        description: 'News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.',
        images: [
            {
                url: '/api/og?title=3AM%20SCROLL',
                width: 1200,
                height: 630,
                alt: '3AM SCROLL',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '3AM SCROLL - Your Late-Night Scroll Companion',
        description: 'News, articles, and stories for Gen Z. Fresh perspectives on tech, gaming, entertainment, and more.',
        creator: '@3amscroll',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        other: {
            "p:domain_verify": "333a55daf11e76cc3fc9ed23c6de2a65",
        },
    },
    alternates: {
        canonical: 'https://3amscroll.com',
    },
    category: 'news',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    let role = null;
    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
        role = profile?.role || null;
    }

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "3AM SCROLL",
                            "url": "https://3amscroll.com",
                            "logo": "https://3amscroll.com/icon-512.png",
                            "description": "News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.",
                            "sameAs": [
                                "https://twitter.com/3amscroll",
                                // Add other social media URLs when available
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "contactType": "Customer Service",
                                "url": "https://3amscroll.com/contact"
                            }
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "3AM SCROLL",
                            "url": "https://3amscroll.com",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://3amscroll.com/search?q={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
            </head>
            <body className={`antialiased ${switzer.variable} ${clashDisplay.variable} font-sans pb-16 lg:pb-0`} suppressHydrationWarning>
                <MobileHeader user={user} role={role} />
                <DesktopHeader user={user} role={role} />
                {children}
                <BottomNav user={user} role={role} />
                <FloatingWriteButton user={user} role={role} />
                <Toaster position="top-right" richColors />
                {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
            </body>
        </html>
    );
}
