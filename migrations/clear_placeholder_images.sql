-- Update existing stories to remove placeholder images
-- This will make them show the fallback icons until you upload real images

UPDATE company_stories
SET image_url = ''
WHERE image_url LIKE '/images/stories/%';

-- Verify the update
SELECT id, title, image_url, category 
FROM company_stories 
ORDER BY display_order;
