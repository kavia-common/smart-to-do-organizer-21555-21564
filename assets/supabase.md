# Supabase Integration Guide for Ocean Tasks

The app uses Supabase for remote data sync of to-do items.

Environment Variables:
- EXPO_PUBLIC_SUPABASE_URL: The project URL (https://PROJECT_ID.supabase.co)
- EXPO_PUBLIC_SUPABASE_KEY: The anon public key

Where used:
- src/lib/supabase.ts initializes the Supabase client using the above vars.

Backend Status (Applied by automation):
- Existing tables detected before setup: expenses, profiles
- Created table: todos
- Enabled Row Level Security (RLS) on todos
- Added development-only permissive RLS policies (select/insert/update/delete) for anonymous access. You MUST tighten for production.

Data Model:
- Table: todos
  - id: uuid primary key (default gen_random_uuid())
  - title: text not null
  - description: text nullable
  - completed: boolean not null default false
  - created_at: timestamptz default now()
  - updated_at: timestamptz nullable

SQL executed:
1) Table creation
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  completed boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

2) RLS and development policies
alter table public.todos enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'todos' and policyname = 'Allow read for anon'
  ) then
    create policy "Allow read for anon" on public.todos for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'todos' and policyname = 'Allow insert for anon'
  ) then
    create policy "Allow insert for anon" on public.todos for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'todos' and policyname = 'Allow update for anon'
  ) then
    create policy "Allow update for anon" on public.todos for update using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'todos' and policyname = 'Allow delete for anon'
  ) then
    create policy "Allow delete for anon" on public.todos for delete using (true);
  end if;
end $$;

Frontend Integration:
- The Supabase client is created in to_do_frontend/src/lib/supabase.ts using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY.
- CRUD helpers are provided: fetchTodos, addTodo, updateTodo, deleteTodo.
- No auth flows are implemented; the app relies on dev policies above.

Security Notes (Production hardening required):
- Replace permissive dev policies with user-scoped policies (e.g., add user_id uuid references auth.users, then policies using auth.uid()).
- Consider rate-limiting or edge functions if necessary.
- Rotate keys if dev anon policies were exposed publicly.

Checklist:
- [x] Table public.todos exists
- [x] RLS enabled
- [x] Dev policies installed
- [x] Frontend uses env-based URL/Key
- [ ] Production policies implemented (action item before launch)

Usage Notes:
- No email redirects required in this app since we do not implement auth flows.
- If you add auth later, configure emailRedirectTo to use SITE_URL env mapping.
