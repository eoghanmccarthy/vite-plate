import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: Bun.fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  plugins: [react()],
})
