import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_TARGET || 'http://localhost:8787'

  return {
    plugins: [vue()],
    server: {
      port: 3000,
      proxy: {
        '/signin': {
          target: apiTarget,
          changeOrigin: true
        },
        '/admin': {
          target: apiTarget,
          changeOrigin: true
        },
        '/user': {
          target: apiTarget,
          changeOrigin: true
        }
      }
    }
  }
})
