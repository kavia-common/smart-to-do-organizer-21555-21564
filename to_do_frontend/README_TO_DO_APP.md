# Ocean Tasks - React Native (Expo) To-Do App

This app implements a modern to-do organizer following the Ocean Professional theme.

Features:
- Full CRUD for tasks (add, edit, delete).
- Mark tasks complete/incomplete.
- Swipe actions (edit, delete).
- Smooth transitions and minimalist UI.
- Supabase integration using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY.

Environment variables (create .env in project root or configure in Expo):
- EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
- EXPO_PUBLIC_SUPABASE_KEY=YOUR-ANON-KEY

Database table (SQL):
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  completed boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

Enable Row Level Security (RLS) and policies for anon if needed for development.

Scripts:
- npm start
- npm run android
- npm run ios
- npm run web

Notes:
- For icons and gestures, this project uses @expo/vector-icons and react-native-gesture-handler.
- Basic in-memory cache is used for last-seen todos (replace with AsyncStorage for persistence).
