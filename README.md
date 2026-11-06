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

The site is published from this repository. `npm run build` runs Vite and then `scripts/publish-root.mjs`, which copies `dist/` into the repository root (`index.html`, `404.html`, `assets/`, `projects/`, SEO files).

CI: `.github/workflows/deploy.yml` builds and deploys the `dist/` artifact. Optional repository secrets:

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
