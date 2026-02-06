const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addBrandColumn() {
    console.log('Adding brand column to products table...');
    
    // Note: This requires database admin access
    // For Supabase, you need to run this in the SQL editor:
    // ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;
    
    console.log('\n⚠️  MANUAL STEP REQUIRED:');
    console.log('Please run this SQL in your Supabase SQL Editor:');
    console.log('\nALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;');
    console.log('\nAfter running the SQL, the brand field will be available.');
}

addBrandColumn();
