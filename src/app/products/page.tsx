'use client';

import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ProductFilters, ProductSort, ProductCard, ProductCardMobile, QuickViewModal } from '@/features/catalog/components';
import { Product } from '@/shared/types/database';

// Sample products for demonstration
const sampleProducts: Product[] = [
    {
        id: '1',
        name: 'Samsung 55" 4K Smart TV',
        slug: 'samsung-55-4k-smart-tv',
        description: 'Experience stunning 4K resolution with HDR support and smart features. Perfect for your living room entertainment.',
        category_id: '1',
        base_price: 250000,
        cash_price: 200000,
        installment_months: 12,
        stock_status: 'in_stock',
        sku: 'TV-SAM-55-001',
        images: [],
        featured_image: '/products/samsung-tv.jpg',
        specifications: { 'Screen Size': '55 Inch', 'Resolution': '4K UHD', 'Smart TV': 'Yes' },
        meta_title: null,
        meta_description: null,
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'LG 420L Double Door Refrigerator',
        slug: 'lg-420l-double-door-refrigerator',
        description: 'Spacious double door refrigerator with inverter compressor for energy efficiency and silent operation.',
        category_id: '2',
        base_price: 180000,
        cash_price: 144000,
        installment_months: 12,
        stock_status: 'in_stock',
        sku: 'FRIDGE-LG-420-001',
        images: [],
        featured_image: '/products/lg-fridge.jpg',
        specifications: { 'Capacity': '420L', 'Type': 'Double Door', 'Inverter': 'Yes' },
        meta_title: null,
        meta_description: null,
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Abans 8kg Front Load Washing Machine',
        slug: 'abans-8kg-front-load-washing-machine',
        description: 'Efficient front load washing machine with multiple wash programs and quick wash feature.',
        category_id: '3',
        base_price: 95000,
        cash_price: 76000,
        installment_months: 12,
        stock_status: 'in_stock',
        sku: 'WASH-ABN-8KG-001',
        images: [],
        featured_image: '/products/abans-washer.jpg',
        specifications: { 'Capacity': '8kg', 'Type': 'Front Load', 'Programs': '12' },
        meta_title: null,
        meta_description: null,
        is_featured: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Panasonic 1.5 Ton Inverter AC',
        slug: 'panasonic-1-5-ton-inverter-ac',
        description: 'Powerful cooling with energy saving inverter technology. Anti-bacterial filter included.',
        category_id: '4',
        base_price: 150000,
        cash_price: 120000,
        installment_months: 12,
        stock_status: 'in_stock',
        sku: 'AC-PAN-1.5-001',
        images: [],
        featured_image: '/products/panasonic-ac.jpg',
        specifications: { 'Capacity': '1.5 Ton', 'Type': 'Inverter', 'Refrigerant': 'R32' },
        meta_title: null,
        meta_description: null,
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '5',
        name: 'Damro 3 Piece Sofa Set',
        slug: 'damro-3-piece-sofa-set',
        description: 'Modern 3-piece sofa set with premium fabric upholstery and solid wood frame.',
        category_id: '5',
        base_price: 125000,
        cash_price: 100000,
        installment_months: 12,
        stock_status: 'pre_order',
        sku: 'SOFA-DAM-001',
        images: [],
        featured_image: '/products/sofa-set.jpg',
        specifications: { 'Material': 'Fabric', 'Seating': '3+2+1', 'Color': 'Grey' },
        meta_title: null,
        meta_description: null,
        is_featured: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '6',
        name: 'Sony 65" 4K OLED TV',
        slug: 'sony-65-4k-oled-tv',
        description: 'Experience pure blacks and lifelike colors with Sony OLED technology. Google TV builtin.',
        category_id: '1',
        base_price: 450000,
        cash_price: 360000,
        installment_months: 12,
        stock_status: 'in_stock',
        sku: 'TV-SONY-65-001',
        images: [],
        featured_image: '/products/sony-oled.jpg',
        specifications: { 'Screen Size': '65 Inch', 'Type': 'OLED', 'OS': 'Google TV' },
        meta_title: null,
        meta_description: null,
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];

export default function ProductsPage() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    const handleQuickView = (product: Product) => {
        setQuickViewProduct(product);
    };

    const handleAddToWishlist = (productId: string) => {
        toast.success('Added to wishlist!');
    };

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                {/* Mobile filter dialog */}
                <ProductFilters
                    mobileFiltersOpen={mobileFiltersOpen}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    mode="mobile"
                />

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900">
                            All Products
                        </h1>

                        <div className="flex items-center">
                            <ProductSort />
                        </div>
                    </div>

                    {/* Mobile Header & Sticky Bar */}
                    <div className="lg:hidden pt-4 pb-4">
                        <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900 mb-4 px-2">
                            All Products
                        </h1>

                        {/* Sticky Toolbar */}
                        <div className="sticky top-[60px] z-20 bg-white/95 backdrop-blur-sm border-y border-gray-100 mx-[-16px] px-4 py-3 flex items-center justify-between gap-4 shadow-sm">
                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 py-2.5 rounded-lg border border-gray-200"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <FiFilter className="h-4 w-4" />
                                Filter
                            </button>
                            <div className="flex-1 min-w-0">
                                <ProductSort />
                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Desktop Sidebar Filters */}
                            <div className="hidden lg:block">
                                <ProductFilters
                                    mobileFiltersOpen={false}
                                    setMobileFiltersOpen={() => { }}
                                    mode="desktop"
                                />
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {/* Mobile Grid (2 columns) */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
                                    {sampleProducts.map((product) => (
                                        <ProductCardMobile
                                            key={product.id}
                                            product={product}
                                            onAddToWishlist={handleAddToWishlist}
                                        />
                                    ))}
                                </div>

                                {/* Desktop Grid (3 columns) */}
                                <div className="hidden lg:grid grid-cols-3 xl:gap-8 gap-y-10">
                                    {sampleProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onQuickView={handleQuickView}
                                            onAddToWishlist={handleAddToWishlist}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
}
