-- Supabase schema for the Wellness Waiver Support services
-- Run this in the Supabase SQL editor.

create table if not exists public.services (
  id text primary key,
  name text not null,
  description text not null,
  category text not null default 'Support service',
  image_url text,
  location text,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

drop policy if exists "public_read_services" on public.services;
create policy "public_read_services"
on public.services
for select
to public
using (true);

drop policy if exists "authenticated_write_services" on public.services;
create policy "authenticated_write_services"
on public.services
for all
to authenticated
using (true)
with check (true);

insert into public.services (id, name, description, category, image_url, location)
values
  (
    'home-community',
    'Home and Community',
    'Provides assistance with maintaining cleanliness in the house, including housekeeping tasks like sweeping, dishes, meal prep, cleaning, laundry, errands, and shopping.',
    'Community support',
    './HM.jpeg',
    null
  ),
  (
    'structured-family-care',
    'Structured Family Care',
    'A caregiver who lives at the same address as the client may be eligible. Support may include activities of daily living (ADLs) and Home and Community tasks.',
    'Family support',
    './SFC.jpg',
    null
  ),
  (
    'attendant-care',
    'Attendant Care',
    'Provides hands-on, hourly assistance with daily activities like bathing, dressing, and mobility. Under updated rules, Legally Responsible Individuals (LRIs), such as spouses or parents of minors, generally cannot be paid as attendant care providers.',
    'Care support',
    './AT.jpg',
    null
  )
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  image_url = excluded.image_url,
  location = excluded.location;

select * from public.services order by name;
