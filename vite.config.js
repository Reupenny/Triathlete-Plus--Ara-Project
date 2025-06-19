import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()],
  build: {
    rollupOptions: {
      output: {
        //Removes the hash at the end of files
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js"
      }
    }
  }
})
