import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'QRub',
        short_name: 'QRub',
        description: 'Plataforma de Questões de Alta Performance',
        start_url: '/',
        display: 'standalone',
        background_color: '#1A1033',
        theme_color: '#8B5CF6',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
