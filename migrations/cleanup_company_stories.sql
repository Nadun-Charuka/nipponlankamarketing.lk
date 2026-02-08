-- Cleanup Script: Remove Company Stories Table and Bucket
-- Run this FIRST to clean up everything

-- Drop all policies first
DROP POLICY IF EXISTS "Allow public read access to featured stories" ON company_stories;
DROP POLICY IF EXISTS "Allow authenticated users to read all stories" ON company_stories;
DROP POLICY IF EXISTS "Allow authenticated users to insert stories" ON company_stories;
DROP POLICY IF EXISTS "Allow authenticated users to update stories" ON company_stories;
DROP POLICY IF EXISTS "Allow authenticated users to delete stories" ON company_stories;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON company_stories;

-- Drop the table
DROP TABLE IF EXISTS company_stories CASCADE;

-- Drop storage policies for stories bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to stories" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to stories" ON storage.objects;

-- Delete all files in the stories bucket (if any)
DELETE FROM storage.objects WHERE bucket_id = 'stories';

-- Delete the bucket
DELETE FROM storage.buckets WHERE id = 'stories';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Company stories table and bucket cleaned up successfully!';
    RAISE NOTICE 'Now run the add_company_stories.sql migration to recreate everything.';
END $$;
