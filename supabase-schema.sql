-- NipponLankaMarketing.lk Database Schema
-- PostgreSQL schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table (hierarchical structure)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table with dual-pricing logic
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Pricing (base price is installment price)
  base_price DECIMAL(10, 2) NOT NULL,
  cash_price DECIMAL(10, 2) GENERATED ALWAYS AS (base_price * 0.80) STORED,
  installment_months INTEGER DEFAULT 12,
  
  -- Inventory
  stock_status TEXT CHECK (stock_status IN ('in_stock', 'out_of_stock', 'pre_order')) DEFAULT 'in_stock',
  sku TEXT UNIQUE,
  
  -- Media
  images JSONB DEFAULT '[]',
  featured_image TEXT,
  
  -- Specifications
  specifications JSONB DEFAULT '{}',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Flags
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users (whitelist)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'super_admin')) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Full-text search
ALTER TABLE products ADD COLUMN search_vector tsvector;
CREATE INDEX idx_products_search ON products USING gin(search_vector);

CREATE OR REPLACE FUNCTION products_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', COALESCE(NEW.name, '') || ' ' || COALESCE(NEW.description, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_update
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION products_search_trigger();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for products and categories
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (TRUE);

-- Admin policies (will be configured after auth setup)
CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Sample data for testing
INSERT INTO categories (name, slug, description) VALUES
  ('Televisions', 'televisions', 'Smart TVs, LED TVs, and Home Entertainment'),
  ('Refrigerators', 'refrigerators', 'Single Door, Double Door, and Side-by-Side Refrigerators'),
  ('Washing Machines', 'washing-machines', 'Front Load and Top Load Washing Machines'),
  ('Air Conditioners', 'air-conditioners', 'Split AC, Window AC, and Inverter AC'),
  ('Furniture', 'furniture', 'Sofas, Beds, Dining Tables, and Home Furniture');

-- Sample products
INSERT INTO products (name, slug, description, category_id, base_price, stock_status, featured_image, is_featured, specifications) VALUES
  (
    'Samsung 55" 4K Smart TV',
    'samsung-55-4k-smart-tv',
    'Experience stunning 4K resolution with HDR support and smart features. Perfect for your living room entertainment.',
    (SELECT id FROM categories WHERE slug = 'televisions'),
    250000.00,
    'in_stock',
    '/products/samsung-tv.jpg',
    TRUE,
    '{"Screen Size": "55 inches", "Resolution": "4K UHD (3840x2160)", "Smart TV": "Yes", "HDR": "Yes", "Refresh Rate": "60Hz", "Warranty": "2 Years"}'::jsonb
  ),
  (
    'LG 420L Double Door Refrigerator',
    'lg-420l-double-door-refrigerator',
    'Spacious double door refrigerator with inverter compressor for energy efficiency and silent operation.',
    (SELECT id FROM categories WHERE slug = 'refrigerators'),
    180000.00,
    'in_stock',
    '/products/lg-fridge.jpg',
    TRUE,
    '{"Capacity": "420 Liters", "Type": "Double Door", "Inverter": "Yes", "Energy Rating": "4 Star", "Warranty": "10 Years Compressor"}'::jsonb
  ),
  (
    'Abans 8kg Front Load Washing Machine',
    'abans-8kg-front-load-washing-machine',
    'Efficient front load washing machine with multiple wash programs and quick wash feature.',
    (SELECT id FROM categories WHERE slug = 'washing-machines'),
    95000.00,
    'in_stock',
    '/products/abans-washer.jpg',
    FALSE,
    '{"Capacity": "8 kg", "Type": "Front Load", "Spin Speed": "1200 RPM", "Programs": "15", "Warranty": "2 Years"}'::jsonb
  );

-- Add a sample admin user (replace with your actual email)
INSERT INTO admin_users (email, role) VALUES
  ('admin@nipponlanka.lk', 'super_admin');

COMMENT ON TABLE products IS 'Product catalog with automatic cash price calculation (20% discount)';
COMMENT ON COLUMN products.cash_price IS 'Automatically calculated as 80% of base_price';
COMMENT ON COLUMN products.base_price IS 'Full installment price (12 months default)';
