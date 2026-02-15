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
    title: "3AM SCROLL - Your Late-Night Scroll Companion",
    description: "News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.",
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
                <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&f[]=clash-display@600,700&display=swap" rel="stylesheet" />
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
