-- 1. Create Categories Table
create table public.categories (
  id text primary key, -- We use text IDs like 'televisions' for simplicity in this project, or uuid
  name text not null,
  slug text not null unique,
  parent_id text references public.categories(id),
  description text,
  image_url text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Products Table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category_id text references public.categories(id), -- simple relationship
  
  -- Pricing
  base_price numeric not null,
  cash_price numeric not null,
  installment_months int default 12,
  
  -- Inventory
  stock_status text check (stock_status in ('in_stock', 'out_of_stock', 'pre_order')) default 'in_stock',
  sku text,
  
  -- Media
  images text[] default array[]::text[],
  featured_image text,
  
  -- Specs (JSONB for flexibility)
  specifications jsonb default '{}'::jsonb,
  
  -- SEO
  meta_title text,
  meta_description text,
  
  -- Flags
  is_featured boolean default false,
  is_active boolean default true,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS (Row Level Security)
alter table public.categories enable row level security;
alter table public.products enable row level security;

-- 4. Create Policies
-- Allow PUBLIC read access (Storefront needs this)
create policy "Allow public read access on categories" on public.categories for select using (true);
create policy "Allow public read access on products" on public.products for select using (is_active = true);

-- Allow AUTHENTICATED users (Admin) full access
create policy "Allow admin full access on categories" on public.categories for all using (auth.role() = 'authenticated');
create policy "Allow admin full access on products" on public.products for all using (auth.role() = 'authenticated');

-- 5. Storage (Bucket Setup Instructions)
-- You need to create a bucket named 'products' in the Storage dashboard.
-- Then ensure it's "Public".
