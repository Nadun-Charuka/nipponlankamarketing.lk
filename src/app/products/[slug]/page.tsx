'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductGallery, ProductInfo, ProductTabs } from '@/features/product/components';
import { ProductCarousel } from '@/features/catalog/components';
import { Product } from '@/shared/types/database';

// Mock Data for PDP
const mockProduct: Product = {
    id: 'prod-1',
    name: 'Samsung 55" 4K Smart Crystal UHD TV - UA55AU7000',
    slug: 'samsung-55-4k-smart-tv',
    description: 'Experience crystal clear colors that are fine-tuned to deliver a naturally crisp and vivid picture. The Crystal Processor 4K ensures you get up to 4K resolution for the content you love.',
    category_id: 'cat-tv',
    base_price: 245000,
    cash_price: 196000,
    installment_months: 12,
    stock_status: 'in_stock',
    sku: 'UA55AU7000',
    images: [],
    featured_image: null,
    specifications: {
        'Display Size': '55 Inch',
        'Resolution': '3,840 x 2,160',
        'Picture Engine': 'Crystal Processor 4K',
        'HDMI Ports': '3',
        'USB Ports': '1',
        'Sound Output': '20W',
        'Operating System': 'Tizen™',
        'Warranty': '2 Years Company Warranty'
    },
    meta_title: null,
    meta_description: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

const relatedProducts: Product[] = [
    {
        id: '1',
        name: 'Samsung 55" 4K Crystal UHD TV',
        slug: 'samsung-55-4k-uhd',
        base_price: 220000,
        cash_price: 176000,
        installment_months: 12,
        stock_status: 'in_stock',
        is_featured: true,
        images: [],
        featured_image: null,
        description: null,
        category_id: null,
        sku: null,
        specifications: {},
        meta_title: null,
        meta_description: null,
        is_active: true,
        created_at: '',
        updated_at: ''
    },
    {
        id: '2',
        name: 'LG 65" NanoCell 4K TV',
        slug: 'lg-65-nanocell',
        base_price: 350000,
        cash_price: 280000,
        installment_months: 24,
        stock_status: 'pre_order',
        is_featured: false,
        images: [],
        featured_image: null,
        description: null,
        category_id: null,
        sku: null,
        specifications: {},
        meta_title: null,
        meta_description: null,
        is_active: true,
        created_at: '',
        updated_at: ''
    },
    {
        id: '3',
        name: 'Sony 50" Bravia XR OLED',
        slug: 'sony-50-bravia',
        base_price: 490000,
        cash_price: 392000,
        installment_months: 24,
        stock_status: 'in_stock',
        is_featured: true,
        images: [],
        featured_image: null,
        description: null,
        category_id: null,
        sku: null,
        specifications: {},
        meta_title: null,
        meta_description: null,
        is_active: true,
        created_at: '',
        updated_at: ''
    },
    {
        id: '4',
        name: 'Panasonic 32" LED TV',
        slug: 'panasonic-32-led',
        base_price: 65000,
        cash_price: 52000,
        installment_months: 6,
        stock_status: 'in_stock',
        is_featured: false,
        images: [],
        featured_image: null,
        description: null,
        category_id: null,
        sku: null,
        specifications: {},
        meta_title: null,
        meta_description: null,
        is_active: true,
        created_at: '',
        updated_at: ''
    }
];

export default function ProductDetailPage() {
    const params = useParams();

    // In a real app, fetch product by params.slug
    // const product = getProductBySlug(params.slug);
    const product = mockProduct;

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
                <div className="mt-24 border-t border-gray-100 pt-16">
                    <ProductCarousel
                        title="You Might Also Like"
                        products={relatedProducts}
                    />
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
    );
}
