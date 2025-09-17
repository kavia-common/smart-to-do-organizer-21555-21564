# Supabase Integration Guide for Ocean Tasks

The app uses Supabase for remote data sync of to-do items.

Environment Variables:
- EXPO_PUBLIC_SUPABASE_URL: The project URL (https://PROJECT_ID.supabase.co)
- EXPO_PUBLIC_SUPABASE_KEY: The anon public key

Where used:
- src/lib/supabase.ts initializes the Supabase client using the above vars.

Data Model:
- Table: todos
  - id: uuid primary key (default gen_random_uuid())
  - title: text not null
  - description: text nullable
  - completed: boolean not null default false
  - created_at: timestamptz default now()
  - updated_at: timestamptz nullable

Recommended SQL:
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  completed boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

Row Level Security:
Enable RLS and add permissive policies for anon key in development if this app runs without auth. For production, implement auth and restrict access per user.

Usage Notes:
- No email redirects required in this app since we do not implement auth flows.
- If you add auth later, configure emailRedirectTo to use SITE_URL env mapping.
