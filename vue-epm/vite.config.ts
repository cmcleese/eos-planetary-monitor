import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    fs: {
      // Allow serving files from one level up (the root)
      allow: ['..'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // This tells Sass to ignore the deprecation warning for @import
        silenceDeprecations: ['import'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared-assets'),
    },
  },
});
