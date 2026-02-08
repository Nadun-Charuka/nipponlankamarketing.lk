import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nipponlanka.vercel.app';
  
  // Create Supabase client for server-side
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch all active products
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true);

  // Fetch all active categories
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .eq('is_active', true);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(category.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
