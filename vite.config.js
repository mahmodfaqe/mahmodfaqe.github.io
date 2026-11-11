import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const SITE_URL = 'https://mahmodfaqe.github.io'
const AUTHOR = 'Mahmood Khdir'
const CV_TITLE = 'Mahmood Khdir Faqe Rasul — CV'

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

// A copy of the built page with its own title and address and, when given, its own
// description and share image, so links to it preview correctly.
function withPageMeta(html, { title, url, description, image }) {
  const set = (page, pattern, value) => page.replace(pattern, (match, start) => start + escapeHtml(value))

  let page = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  page = set(page, /(<link rel="canonical" href=")[^"]*/, url)
  page = set(page, /(<meta property="og:url" content=")[^"]*/, url)
  page = set(page, /(<meta property="og:title" content=")[^"]*/, title)
  page = set(page, /(<meta name="twitter:title" content=")[^"]*/, title)

  if (description) {
    page = set(page, /(<meta name="description" content=")[^"]*/, description)
    page = set(page, /(<meta property="og:description" content=")[^"]*/, description)
    page = set(page, /(<meta name="twitter:description" content=")[^"]*/, description)
  }

  if (image) {
    page = set(page, /(<meta property="og:image" content=")[^"]*/, image)
    page = set(page, /(<meta property="og:image:alt" content=")[^"]*/, title)
    page = set(page, /(<meta name="twitter:image" content=")[^"]*/, image)
  }

  return page
}

// GitHub Pages has no SPA rewrites: unknown paths get 404.html, a copy of the app, and
// every real page (/cv/ and each case study) gets a file of its own so it answers 200.
function githubPagesEntries() {
  return {
    name: 'github-pages-entries',
    apply: 'build',
    async writeBundle({ dir }) {
      const html = readFileSync(join(dir, 'index.html'), 'utf8')
      const writePage = (path, page) => {
        mkdirSync(join(dir, path), { recursive: true })
        writeFileSync(join(dir, path, 'index.html'), page)
      }

      writeFileSync(join(dir, '404.html'), html)
      writePage('cv', withPageMeta(html, { title: CV_TITLE, url: `${SITE_URL}/cv/` }))

      // Loaded here, not imported at the top, so editing the data does not restart the dev server.
      const load = (file) => import(pathToFileURL(join(ROOT, file)).href)
      const [{ STATIC_PROJECTS }, { CASE_STUDIES }] = await Promise.all([
        load('src/data/profile.js'),
        load('src/data/caseStudies.js'),
      ])

      for (const study of CASE_STUDIES) {
        const project = STATIC_PROJECTS.find((item) => item.id === study.projectId)
        writePage(
          `projects/${study.slug}`,
          withPageMeta(html, {
            title: `${project.nama} — ${AUTHOR}`,
            url: `${SITE_URL}/projects/${study.slug}/`,
            description: study.summary,
            image: `${SITE_URL}/projects/${study.slug}/og.jpg`,
          }),
        )
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ROOT, 'VITE_')
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
