-- Migration: Add Company Stories Table and Storage Bucket
-- Run cleanup_company_stories.sql FIRST if you need to reset everything

-- Step 1: Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'stories',
    'stories',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Step 2: Create storage policies for the bucket
CREATE POLICY "Allow public read access to stories"
ON storage.objects FOR SELECT
USING ( bucket_id = 'stories' );

CREATE POLICY "Allow authenticated uploads to stories"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'stories' );

CREATE POLICY "Allow authenticated updates to stories"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'stories' );

CREATE POLICY "Allow authenticated deletes from stories"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'stories' );

-- Step 3: Create company_stories table
CREATE TABLE company_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('charity', 'delivery', 'team', 'community', 'event')),
    is_featured BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Enable Row Level Security
ALTER TABLE company_stories ENABLE ROW LEVEL SECURITY;

-- Step 5: Create table policies
CREATE POLICY "Allow public read access to featured stories"
ON company_stories FOR SELECT
USING (is_featured = true);

CREATE POLICY "Allow authenticated users to read all stories"
ON company_stories FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to insert stories"
ON company_stories FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update stories"
ON company_stories FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete stories"
ON company_stories FOR DELETE
TO authenticated
USING (true);

-- Step 6: Create indexes for better query performance
CREATE INDEX idx_company_stories_featured ON company_stories(is_featured, display_order);
CREATE INDEX idx_company_stories_category ON company_stories(category);

-- Step 7: Insert sample data
INSERT INTO company_stories (title, description, image_url, category, is_featured, display_order) VALUES
('Flood Relief Donation Drive', 'We donated essential supplies to families affected by the recent floods in Colombo district, helping over 100 families rebuild their lives.', '/images/stories/charity-1.jpg', 'charity', true, 1),
('Customer Delivery in Kandy', 'Successfully delivered a premium refrigerator to our valued customer in Kandy with our white-glove delivery service.', '/images/stories/delivery-1.jpg', 'delivery', true, 2),
('Team Building Day 2024', 'Our amazing team came together for a day of fun activities and bonding, strengthening our commitment to excellent customer service.', '/images/stories/team-1.jpg', 'team', true, 3),
('School Supplies Donation', 'Donated school supplies and furniture to rural schools in Gampaha district, supporting education for 200+ students.', '/images/stories/charity-2.jpg', 'charity', true, 4),
('Community Clean-Up Drive', 'Our team participated in a beach clean-up initiative in Mount Lavinia, collecting over 500kg of waste.', '/images/stories/community-1.jpg', 'community', true, 5),
('Grand Opening Celebration', 'Celebrated our new showroom opening with special discounts and giveaways for our loyal customers.', '/images/stories/event-1.jpg', 'event', true, 6);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Company stories migration completed successfully!';
    RAISE NOTICE '✅ Storage bucket "stories" created and configured';
    RAISE NOTICE '✅ Table "company_stories" created with sample data';
    RAISE NOTICE '✅ All policies configured';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Go to Storage in Supabase dashboard';
    RAISE NOTICE '2. Verify the "stories" bucket exists';
    RAISE NOTICE '3. Test uploading images in /admin/stories/new';
END $$;
