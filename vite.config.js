

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: './',  // Use relative path so assets load correctly from backend's static folder
//   plugins: [react()],
// });



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // Use relative path so assets load correctly from backend's static folder
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
      '/output_videos': 'http://localhost:5001',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // ⬅️ Suppress large chunk warning
  },
});
