'use server';

import { supabaseAdmin } from '@/shared/lib/supabase-admin';
import { allProducts } from '@/shared/data/products';

export async function seedDatabase() {
    try {
        console.log('Starting server-side seed...');

        // 1. Seed Categories
        const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category_id).filter(Boolean)));
        
        const categoriesData = uniqueCategories.map(catId => ({
            id: catId!,
            name: catId!.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            slug: catId!,
            is_active: true
        }));

        console.log(`Seeding ${categoriesData.length} categories...`);
        const { error: catError } = await supabaseAdmin
            .from('categories')
            .upsert(categoriesData, { onConflict: 'slug' });

        if (catError) {
            console.error('Category Seed Error:', catError);
            throw new Error(`Category Error: ${catError.message}`);
        }

        // 2. Seed Products
        console.log(`Seeding ${allProducts.length} products...`);
        const productsData = allProducts.map(p => ({
            name: p.name,
            slug: p.slug,
            description: p.description,
            category_id: p.category_id,
            base_price: p.base_price,
            cash_price: p.cash_price,
            installment_months: p.installment_months,
            stock_status: p.stock_status,
            sku: p.sku,
            images: p.images,
            featured_image: p.featured_image,
            specifications: p.specifications,
            is_featured: p.is_featured,
            is_active: p.is_active
        }));

        const { error: prodError } = await supabaseAdmin
            .from('products')
            .upsert(productsData, { onConflict: 'slug' });

        if (prodError) {
            console.error('Product Seed Error:', prodError);
            throw new Error(`Product Error: ${prodError.message}`);
        }

        return { success: true, message: `Successfully seeded ${allProducts.length} products and ${categoriesData.length} categories.` };

    } catch (error: any) {
        console.error('Seed Exception:', error);
        return { success: false, message: error.message };
    }
}
