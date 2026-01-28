-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enquiries table if it doesn't exist
create table if not exists public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  phone text,
  subject text,
  message text,
  source text,
  status text default 'new'
);

-- Enable RLS
alter table public.enquiries enable row level security;

-- Create policy to allow public to insert (submit enquiries)
create policy "Allow public to insert enquiries"
on public.enquiries
for insert
to public
with check (true);

-- Create policy to allow admins to view enquiries
create policy "Allow admins to view enquiries"
on public.enquiries
for select
to authenticated
using (true);

-- Create policy to allow admins to update enquiries (e.g. status)
create policy "Allow admins to update enquiries"
on public.enquiries
for update
to authenticated
using (true);
