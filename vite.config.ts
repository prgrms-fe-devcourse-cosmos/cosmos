import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // 모바일 테스트용 서버
  server: {
    host: true,
  },
  plugins: [react(), tailwindcss()],
});
