import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: '3AM SCROLL - Your Late-Night Scroll Companion',
        short_name: '3AM SCROLL',
        description: 'News, articles, and stories for Gen Z. Your go-to platform for tech, gaming, entertainment, and more.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563EB',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
        categories: ['news', 'entertainment', 'lifestyle'],
        orientation: 'portrait-primary',
        scope: '/',
    }
}
