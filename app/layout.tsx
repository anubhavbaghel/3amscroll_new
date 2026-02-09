import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "3AM SCROLL - Your Late-Night Scroll Companion",
    description: "News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
