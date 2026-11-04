-- Portfolio CMS hardening — run once in Supabase SQL Editor
-- Dashboard → SQL → New query → paste → Run
-- Assumes tables: profiles(id uuid PK = auth.uid(), role text), "Project", "Skills"
-- Storage bucket: project-files

-- ---------------------------------------------------------------------------
-- Helper: current user is admin
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- profiles: users can read own row; only admins can change role/rows
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_non_role" on public.profiles;
-- Block client updates to profiles entirely (role must stay server/admin-only).
-- Admins who need to change roles should use the SQL editor / service role.
drop policy if exists "profiles_no_client_update" on public.profiles;
create policy "profiles_no_client_update"
  on public.profiles
  for update
  to authenticated
  using (false);

drop policy if exists "profiles_no_client_insert" on public.profiles;
create policy "profiles_no_client_insert"
  on public.profiles
  for insert
  to authenticated
  with check (false);

drop policy if exists "profiles_no_client_delete" on public.profiles;
create policy "profiles_no_client_delete"
  on public.profiles
  for delete
  to authenticated
  using (false);

-- ---------------------------------------------------------------------------
-- Project: public read; admin write
-- ---------------------------------------------------------------------------
alter table public."Project" enable row level security;

drop policy if exists "project_public_select" on public."Project";
create policy "project_public_select"
  on public."Project"
  for select
  to anon, authenticated
  using (true);

drop policy if exists "project_admin_insert" on public."Project";
create policy "project_admin_insert"
  on public."Project"
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "project_admin_update" on public."Project";
create policy "project_admin_update"
  on public."Project"
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "project_admin_delete" on public."Project";
create policy "project_admin_delete"
  on public."Project"
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Skills: public read; admin write
-- ---------------------------------------------------------------------------
alter table public."Skills" enable row level security;

drop policy if exists "skills_public_select" on public."Skills";
create policy "skills_public_select"
  on public."Skills"
  for select
  to anon, authenticated
  using (true);

drop policy if exists "skills_admin_insert" on public."Skills";
create policy "skills_admin_insert"
  on public."Skills"
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "skills_admin_update" on public."Skills";
create policy "skills_admin_update"
  on public."Skills"
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "skills_admin_delete" on public."Skills";
create policy "skills_admin_delete"
  on public."Skills"
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: project-files — public read, admin write
-- ---------------------------------------------------------------------------
-- Create bucket in Dashboard → Storage if missing (public).
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', true)
on conflict (id) do update set public = true;

drop policy if exists "project_files_public_read" on storage.objects;
create policy "project_files_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'project-files');

drop policy if exists "project_files_admin_insert" on storage.objects;
create policy "project_files_admin_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'project-files' and public.is_admin());

drop policy if exists "project_files_admin_update" on storage.objects;
create policy "project_files_admin_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-files' and public.is_admin())
  with check (bucket_id = 'project-files' and public.is_admin());

drop policy if exists "project_files_admin_delete" on storage.objects;
create policy "project_files_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-files' and public.is_admin());
