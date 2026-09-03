import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const stylesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/assets/styles')

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [stylesDir],
        additionalData: '@use "abstracts" as *;',
      },
    },
  },
})
