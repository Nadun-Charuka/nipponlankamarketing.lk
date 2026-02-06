-- Add hero item columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS is_hero BOOLEAN DEFAULT FALSE;

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS hero_order INTEGER DEFAULT 0;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_hero 
ON products(is_hero, hero_order) 
WHERE is_hero = true;

-- Add comment for documentation
COMMENT ON COLUMN products.is_hero IS 'Indicates if product should appear in hero slider';
COMMENT ON COLUMN products.hero_order IS 'Display order in hero slider (1-6)';
