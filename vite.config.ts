import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // During `npm run dev`, forward /api/* to the Express server on :3001
      '/api': 'http://localhost:3001',
    },
  },
});
