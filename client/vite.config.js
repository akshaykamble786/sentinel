import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
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
  }
}))
