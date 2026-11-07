import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_')
  const hasSupabase = Boolean(env.VITE_SUPABASE_URL?.trim() && env.VITE_SUPABASE_KEY?.trim())

  return {
    plugins: [
      react(),
      {
        name: 'spa-github-pages',
        closeBundle() {
          copyFileSync('dist/index.html', 'dist/404.html')
        },
      },
    ],
    // With no Supabase settings the CMS is off, so the stub keeps the client library out of the bundle.
    resolve: hasSupabase
      ? {}
      : {
          alias: {
            '@supabase/supabase-js': fileURLToPath(new URL('./src/assets/supabase-stub.js', import.meta.url)),
          },
        },
    base: '/',
  }
})
