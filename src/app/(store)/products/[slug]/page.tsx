import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { createClient } from '@supabase/supabase-js';
import { ProductGallery, ProductInfo, ProductTabs } from '@/features/product/components';
import { Product } from '@/shared/types/database';
import {
    generateProductSchema,
    generateBreadcrumbSchema,
    generateProductTitle,
    generateProductDescription
} from '@/shared/lib/seo';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const title = generateProductTitle(product);
    const description = generateProductDescription(product);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nipponlanka.vercel.app';
    const imageUrl = product.featured_image ? `${baseUrl}${product.featured_image}` : undefined;

    return {
        title,
        description,
        keywords: [
            product.name,
            product.brand || '',
            `${product.name} price`,
            `${product.name} Sri Lanka`,
            `${product.brand || ''} ${product.category_id || ''}`,
            'installment plans',
            'free delivery',
        ].filter(Boolean),
        openGraph: {
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (error || !product) {
        notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nipponlanka.vercel.app';
    const productSchema = generateProductSchema(product, baseUrl);
    const breadcrumbSchema = generateBreadcrumbSchema(
        [
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
            { name: product.name, url: `/products/${product.slug}` },
        ],
        baseUrl
    );

    return (
        <>
            {/* Product Schema for SEO */}
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            {/* Breadcrumb Schema for SEO */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <main className="bg-white min-h-screen pb-24 md:pb-16">
                {/* Breadcrumb - Compact */}
                <div className="container mx-auto px-4 py-3 border-b border-gray-100 mb-6">
                    <div className="text-xs text-gray-500 flex items-center gap-1 overflow-x-auto whitespace-nowrap">
                        <a href="/" className="hover:text-gray-900">Home</a> /
                        <a href="/products" className="hover:text-gray-900">Products</a> /
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column: Gallery (Sticky on Desktop) */}
                        <div className="md:col-span-6 lg:col-span-7">
                            <div className="md:sticky md:top-24 space-y-8">
                                <ProductGallery
                                    images={product.images}
                                    featuredImage={product.featured_image}
                                    productName={product.name}
                                />
                            </div>
                        </div>

                        {/* Right Column: Info & Actions */}
                        <div className="md:col-span-6 lg:col-span-5">
                            <div className="md:sticky md:top-24">
                                <ProductInfo product={product} />

                                {/* Accordion/Tabs for Specs - Integrated here for "Single View" feel */}
                                <div className="mt-8 border-t border-gray-100 pt-6">
                                    <ProductTabs
                                        description={product.description || ''}
                                        specifications={product.specifications}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden z-40 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button className="flex-1 bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg text-sm">
                        Buy Now
                    </button>
                    <button className="flex-1 bg-[#25D366] text-white font-bold py-3 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2">
                        WhatsApp
                    </button>
                </div>
            </main>
        </>
    );
}
