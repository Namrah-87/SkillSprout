import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        home: resolve(__dirname, 'home.html'),
        signup: resolve(__dirname, 'signup.html'),
        login: resolve(__dirname, 'login.html'),
        logout: resolve(__dirname, 'logout.html'),
        courses: resolve(__dirname, './courses/courses.html'),
        intro_to_html: resolve(__dirname, '/courses/intro-to-html/intro-to-html.html'),
        what_is_html: resolve(__dirname, "courses/intro-to-html/exercise/what-is-html.html")
      }
    }
  }
})
