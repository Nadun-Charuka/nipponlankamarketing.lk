-- Add icon_name and display_order columns to categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon_name TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing categories with icons and display order
UPDATE categories SET icon_name = 'MdTv', display_order = 1 WHERE slug = 'televisions';
UPDATE categories SET icon_name = 'MdKitchen', display_order = 2 WHERE slug = 'refrigerators';
UPDATE categories SET icon_name = 'MdLocalLaundryService', display_order = 3 WHERE slug = 'washing-machines';
UPDATE categories SET icon_name = 'MdAcUnit', display_order = 4 WHERE slug = 'air-conditioners';
UPDATE categories SET icon_name = 'MdChair', display_order = 5 WHERE slug = 'furniture';
UPDATE categories SET icon_name = 'MdKitchenOutlined', display_order = 6 WHERE slug = 'kitchen';

-- Add more categories if needed (examples)
-- INSERT INTO categories (id, name, slug, icon_name, display_order) VALUES
-- (gen_random_uuid(), 'Fans', 'fans', 'MdAir', 7),
-- (gen_random_uuid(), 'Lighting', 'lighting', 'MdLightbulb', 8),
-- (gen_random_uuid(), 'Sound Systems', 'sound-systems', 'MdSpeaker', 9);
