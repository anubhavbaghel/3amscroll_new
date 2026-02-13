import { createClient } from "@/lib/supabase/server";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

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
        <html lang="en">
            <head>
                <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <MobileHeader user={user} />
                <DesktopHeader user={user} />
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html >
    );
}
