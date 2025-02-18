import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDev = process.env.NODE_ENV === 'dev';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        port: 3001,
        hmr: {
            host: isDev ? 'localhost' : 'brocha.biesalab.org',
            protocol: isDev ? 'ws' : 'wss',
          },
    },
    base: '/admin/',
});
