import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        hmr: {
            host: 'localhost',
            port: 5173
        }
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
                navigateFallback: 'index.html',
                // Don't cache chrome-extension:// requests
                navigateFallbackDenylist: [/^\/chrome-extension/],
            },
            manifest: {
                name: 'BSA Troop 242 - Central Florida',
                short_name: 'Troop 242',
                description: 'BSA Troop 242 - Central Florida - Adventure, Leadership, and Excellence in Scouting.',
                theme_color: '#f5f5f7',
                background_color: '#f5f5f7',
                display: 'standalone',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
})
