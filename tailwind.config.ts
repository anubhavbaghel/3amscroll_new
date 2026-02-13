import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['Clash Display', 'sans-serif'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    DEFAULT: "#2563EB", // Electric Blue
                    dark: "#3B82F6",
                    glow: "#60A5FA",
                },
                dark: {
                    bg: "#050505", // Deep Black
                    surface: "#121212", // Slightly lighter for cards
                    border: "#27272a",
                }
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} satisfies Config;
