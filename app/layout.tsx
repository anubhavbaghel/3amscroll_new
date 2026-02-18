import { createClient } from "@/lib/supabase/server";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingWriteButton } from "@/components/write/FloatingWriteButton";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://3amscroll.com'),
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
        url: 'https://3amscroll.com',
        siteName: '3AM SCROLL',
        title: '3AM SCROLL - Your Late-Night Scroll Companion',
        description: 'News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: '3AM SCROLL - Gen Z News Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '3AM SCROLL - Your Late-Night Scroll Companion',
        description: 'News, articles, and stories for Gen Z. Fresh perspectives on tech, gaming, entertainment, and more.',
        images: ['/og-image.png'],
        creator: '@3amscroll',
    },
    robots: {
        index: false, // Will be enabled after all SEO fixes
        follow: true,
        googleBot: {
            index: false,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/icon.png',
        apple: '/apple-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        // google: 'your-google-verification-code', // Add after setting up Google Search Console
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
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
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <html lang="en" className={`${inter.variable}`}>
            <head>
                <link rel="preconnect" href="https://api.fontshare.com" />
                <link rel="dns-prefetch" href="https://api.fontshare.com" />
                <link
                    rel="preload"
                    as="style"
                    href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&f[]=clash-display@600,700&display=swap"
                />
                <link
                    href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&f[]=clash-display@600,700&display=swap"
                    rel="stylesheet"
                    media="print"
                    onLoad={(e) => {
                        (e.currentTarget as HTMLLinkElement).media = "all";
                    }}
                />
                <noscript>
                    <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&f[]=clash-display@600,700&display=swap" rel="stylesheet" />
                </noscript>
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
            <body className="antialiased font-sans pb-16 lg:pb-0" suppressHydrationWarning>
                <MobileHeader user={user} />
                <DesktopHeader user={user} />
                {children}
                <BottomNav user={user} />
                <FloatingWriteButton user={user} />
                <Toaster position="top-right" richColors />
            </body>
        </html >
    );
}
