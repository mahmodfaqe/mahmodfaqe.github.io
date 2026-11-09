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
npm run build   # builds dist/, the files GitHub Pages serves
npm run lint
```

## GitHub Pages

Pages source is **GitHub Actions**. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`. Pull requests only run the build.

- Commit source changes only. `dist/` is build output and is never committed.
- `index.html` is the Vite template; `npm run dev` and `npm run build` leave it unchanged.
- GitHub Pages has no SPA rewrites, so the build also writes `dist/404.html` (the app, for unknown paths) and `dist/cv/index.html` (so `/cv/` answers 200 with the CV title).

Optional repository secrets (used by the build):

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

- Contact: WhatsApp `+964 770 469 2000`; Telegram by username (`@mahmod_faqe`).
- Bootstrap **JavaScript** is not imported; collapse/nav state is handled in React.
- Bootstrap **CSS** remains for grid/navbar utilities to avoid a full layout rewrite.
