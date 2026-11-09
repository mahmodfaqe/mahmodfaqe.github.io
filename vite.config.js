import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const CV_TITLE = 'Mahmood Khdir Faqe Rasul — CV'
const CV_URL = 'https://mahmodfaqe.github.io/cv/'

// GitHub Pages has no SPA rewrites: unknown paths get 404.html, a copy of the app,
// and /cv/ gets its own page so it answers 200 with the CV title and canonical URL.
function githubPagesEntries() {
  return {
    name: 'github-pages-entries',
    apply: 'build',
    writeBundle({ dir }) {
      const html = readFileSync(join(dir, 'index.html'), 'utf8')
      writeFileSync(join(dir, '404.html'), html)
      mkdirSync(join(dir, 'cv'), { recursive: true })
      writeFileSync(
        join(dir, 'cv', 'index.html'),
        html
          .replace(/<title>[^<]*<\/title>/, `<title>${CV_TITLE}</title>`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${CV_URL}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${CV_URL}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${CV_TITLE}`)
          .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${CV_TITLE}`),
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_')
  const hasSupabase = Boolean(env.VITE_SUPABASE_URL?.trim() && env.VITE_SUPABASE_KEY?.trim())

  return {
    plugins: [react(), githubPagesEntries()],
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
