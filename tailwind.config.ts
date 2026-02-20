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
                sans: ['var(--font-switzer)', 'sans-serif'],
                display: ['var(--font-switzer)', 'sans-serif'],
                logo: ['var(--font-clash-display)', 'sans-serif'],
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
                '3xl': '2rem',
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} satisfies Config;
