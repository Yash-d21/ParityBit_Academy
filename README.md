# 🛡️ ParityBit Academy - Cybersecurity Masterclass

A premium, high-conversion cybersecurity enrollment platform and Learning Management System (LMS) prototype. Designed for elite defensive and offensive cyber training.

## 🚀 Deployment (Vercel)

1. **Push to GitHub**: Already completed to `Yash-d21/ParityBit_Academy`.
2. **Connect to Vercel**: Import the repository in your Vercel Dashboard.
3. **Configure Environment Variables**:
   Add the following in Vercel Project Settings > Environment Variables:
   - `VITE_SUPABASE_URL` = (Your Supabase URL)
   - `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` = (Your Supabase Anon Key)
4. **Build Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 🗄️ Database Setup (Supabase)

Run this SQL in your Supabase SQL Editor to enable the student profile tracking:

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  payment_status text default 'pending',
  updated_at timestamp with time zone default now(),
  constraint payment_status_check check (payment_status in ('pending', 'completed'))
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
```

## 🛠️ Local Development

1. **Install Dependencies**: `npm install`
2. **Setup .env**: Copy `.env.example` to `.env` and add your Supabase credentials.
3. **Run Dev Server**: `npm run dev`

## ✨ Features

- **Dynamic Enrollment Funnel**: Smart routing based on student payment status.
- **Supabase Auth**: Real-time session management and profile syncing.
- **Premium UI**: Dark-themed, high-performance interface with glassmorphism and smooth animations.
- **Responsive Navigation**: Context-aware student header with initials-based avatars.
