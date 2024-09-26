import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    root: 'client',
    base: './',
    server: {
        open: true,
        port: 3000,
        strictPort: true,
    },
    build: {
        outDir: 'clientBuild',
        emptyOutDir: true,
    },
    plugins: [react()],
});
