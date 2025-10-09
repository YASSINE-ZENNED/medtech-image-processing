import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/medtech-image-processing/',
  plugins: [react()],
  define: {
    'process.env.BACKEND_URL': JSON.stringify('https://zenned-ai-tech-test.hf.space/process')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});