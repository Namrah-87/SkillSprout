import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        home: resolve(__dirname, 'home.html'),
        signup: resolve(__dirname, 'signup.html')
      }
    }
  }
})
