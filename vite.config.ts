import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

const stylesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/assets/styles')

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [vue(), ...(mode === 'singlefile' ? [viteSingleFile()] : [])],
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
  build: {
    assetsInlineLimit: mode === 'singlefile' ? 100000000 : 4096,
    cssCodeSplit: mode !== 'singlefile',
  },
}))
