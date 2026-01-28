-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create enquiries table if it doesn't exist
create table if not exists public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Add missing columns explicitly (Idempotent)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'name') then
        alter table public.enquiries add column name text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'email') then
        alter table public.enquiries add column email text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'phone') then
        alter table public.enquiries add column phone text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'subject') then
        alter table public.enquiries add column subject text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'message') then
        alter table public.enquiries add column message text;
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'source') then
        alter table public.enquiries add column source text;
    end if;

     if not exists (select 1 from information_schema.columns where table_name = 'enquiries' and column_name = 'status') then
        alter table public.enquiries add column status text default 'New';
    end if;
end $$;

-- 3. Enable RLS
alter table public.enquiries enable row level security;

-- 4. Drop existing policies to avoid conflicts
drop policy if exists "Allow public to insert enquiries" on public.enquiries;
drop policy if exists "Allow admins to view enquiries" on public.enquiries;
drop policy if exists "Allow admins to update enquiries" on public.enquiries;

-- 5. Re-create policies
create policy "Allow public to insert enquiries"
on public.enquiries
for insert
to public
with check (true);

create policy "Allow admins to view enquiries"
on public.enquiries
for select
to authenticated
using (true);

create policy "Allow admins to update enquiries"
on public.enquiries
for update
to authenticated
using (true);
