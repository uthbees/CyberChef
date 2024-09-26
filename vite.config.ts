import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        open: true,
        port: 3000,
        strictPort: true,
    },
    build: {
        outDir: 'build',
    },
    plugins: [react()],
});
