# Mahmood Khdir — Portfolio

Personal portfolio for **Mahmood Khdir Faqe Rasul**: biology student and web & mobile developer at the University of Raparin.

**Live site:** [https://mahmodfaqe.github.io/](https://mahmodfaqe.github.io/)

## Stack

- React 19 + Vite
- Bootstrap 5 CSS (layout utilities; JS bundle not loaded)
- AOS for scroll reveals
- Optional Supabase for admin CMS (projects & skills)

## Local development

```bash
npm ci
cp .env.example .env   # optional — only needed for admin/CMS
npm run dev
```

```bash
npm run build   # builds dist/ and publishes assets to repo root for GitHub Pages
npm run lint
```

## GitHub Pages

Pages source is **Deploy from a branch → `main` / (root)**.

1. Locally (or before push): `npm run build` runs Vite, then `scripts/publish-root.mjs` copies `dist/` into the repo root (`index.html`, `404.html`, `assets/`, `projects/`, SEO files).
2. Commit those publish-root files with your source changes and push `main`.
3. GitHub’s branch Pages builder publishes the root. SPA routes (e.g. `/cv`) rely on `404.html` being a copy of `index.html`.

CI (`.github/workflows/deploy.yml`) only **verifies** the build. It does **not** call `actions/deploy-pages` — that conflicts with branch-based Pages.

Optional repository secrets (used when CI builds):

| Secret | Value |
|--------|--------|
| `VITE_SUPABASE_URL` | Supabase project URL (admin CMS) |
| `VITE_SUPABASE_KEY` | Supabase **anon** key only |
| `VITE_FORMSPREE_ID` | Formspree form id for contact form delivery |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible domain (e.g. `mahmodfaqe.github.io`) |

## Supabase CMS hardening

Apply Row Level Security once (SQL Editor):

1. Open `supabase/rls-policies.sql`
2. Paste into Supabase → SQL Editor → Run
3. Ensure your user has `role = 'admin'` in `profiles`

Details: [`supabase/README.md`](supabase/README.md)

## Project structure (high level)

- `src/data/profile.js` — static profile, skills, projects
- `src/components/` — landing sections
- `src/Admin/` — login
- `public/projects/` — project covers (JPG + WebP)
- `public/og-cover.jpg` — Open Graph / Twitter share image (1200×630)

## Notes

- Contact phones intentionally use **two numbers**: WhatsApp `+964 770 469 2000`, Telegram `+964 750 708 7901`.
- Bootstrap **JavaScript** is not imported; collapse/nav state is handled in React.
- Bootstrap **CSS** remains for grid/navbar utilities to avoid a full layout rewrite.
