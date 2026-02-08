-- Migration: Add Featured and New Arrivals fields to products table
-- Run this in your Supabase SQL Editor

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS new_arrival_order INTEGER DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN products.is_new IS 'Flag to mark product as new arrival';
COMMENT ON COLUMN products.featured_order IS 'Display order in Featured Products section (lower = first)';
COMMENT ON COLUMN products.new_arrival_order IS 'Display order in New Arrivals section (lower = first)';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new) WHERE is_new = true;
CREATE INDEX IF NOT EXISTS idx_products_featured_order ON products(featured_order) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_new_arrival_order ON products(new_arrival_order) WHERE is_new = true;
