import path from "path"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    base: mode === 'extension' ? './' : '/',
    plugins: [
      react(),
      tailwindcss()
    ],
    resolve:{
      alias:{
        "@" :  path.resolve(__dirname, "./src"),
        pages: path.resolve(__dirname, 'pages')
      }
    },
    build: {
      outDir: mode === 'extension' ? path.resolve(__dirname, '../extension') : undefined,
      emptyOutDir: mode === 'extension' ? false : undefined
    },
    define: {
      // Ensure environment variables are available during build
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL)
    }
  }
})
