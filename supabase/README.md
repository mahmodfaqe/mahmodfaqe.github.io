# Supabase CMS hardening

## Apply RLS (required once)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **SQL Editor** → **New query**.
3. Paste the full contents of `rls-policies.sql`.
4. Click **Run**.
5. Confirm each admin user has `role = 'admin'` in `profiles`:

```sql
select id, role from public.profiles;
-- update public.profiles set role = 'admin' where id = '<auth-user-uuid>';
```

## GitHub Actions secrets (for live admin CMS)

In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | Project URL (`https://….supabase.co`) |
| `VITE_SUPABASE_KEY` | **anon** public key only (never the service role) |

After both secrets exist, push to `main` (or run **Deploy to GitHub Pages** manually). The workflow injects them at build time.
