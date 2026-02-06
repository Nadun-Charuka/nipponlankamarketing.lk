'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { ProductGallery, ProductInfo, ProductTabs } from '@/features/product/components';
import { ProductCarousel } from '@/features/catalog/components';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';
import { LogoLoader } from '@/shared/components/LogoLoader';

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Product by Slug
    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                console.error('Error loading product:', error);
                // In a real app, you might want to redirect or show 404
            } else {
                setProduct(data);
            }
            setLoading(false);
        }

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LogoLoader />
            </div>
        );
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    return (
        <main className="bg-white min-h-screen pb-24 md:pb-16">
            {/* Breadcrumb - Compact */}
            <div className="container mx-auto px-4 py-3 border-b border-gray-100 mb-6">
                <div className="text-xs text-gray-500 flex items-center gap-1 overflow-x-auto whitespace-nowrap">
                    <span>Home</span> / <span>Televisions</span> / <span>Samsung</span> / <span className="text-gray-900 font-medium truncate">{product.name}</span>
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

                            {/* Description (Moved here for desktop balance or keep in Tabs?) 
                                Let's keep tabs in the right to make it "single card" feel or 
                                put Description here to fill space? 
                                User wants "compact single page". 
                                Putting tabs in right col makes right col long.
                                Putting tabs below gallery makes left col long.
                                Let's put Tabs below content *but* use a more compact 2-col visual.
                            */}
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

                {/* Related Products - Distinct Section */}
                {/* Related Products - Distinct Section 
                <div className="mt-24 border-t border-gray-100 pt-16">
                    <ProductCarousel
                        title="You Might Also Like"
                        products={[]} // TODO: Fetch related products
                    />
                </div>
                */}
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
    );
}
