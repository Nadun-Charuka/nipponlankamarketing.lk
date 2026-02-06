'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { supabase } from '@/shared/lib/supabase';
import { ProductFilters, ProductSort, ProductCard, ProductCardMobile, QuickViewModal } from '@/features/catalog/components';
import { Product } from '@/shared/types/database';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    // Unwrap params Promise (Next.js 15 requirement)
    const { slug } = use(params);

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState('');

    // Filter State (no category filter needed - already filtered by slug)
    const [activeFilters, setActiveFilters] = useState({
        brand: [] as string[],
        priceRange: { min: '' as number | '', max: '' as number | '' },
        stock: [] as string[],
    });

    // 1. Fetch Products for Category by slug
    useEffect(() => {
        async function fetchCategoryProducts() {
            console.log('🔍 Fetching products for category slug:', slug);
            setLoading(true);

            // First, get the category by slug
            const { data: category, error: categoryError } = await supabase
                .from('categories')
                .select('id, name')
                .eq('slug', slug)
                .single();

            if (categoryError || !category) {
                console.error('Category not found:', categoryError);
                setLoading(false);
                notFound();
                return;
            }

            setCategoryTitle(category.name);

            // Then fetch products for this category using the UUID
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('category_id', category.id)
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('❌ Error fetching category products:', error);
                toast.error('Failed to load products');
            } else {
                console.log(`✅ Found ${data?.length || 0} products for category "${category.name}":`, data);
                setProducts(data || []);
                setFilteredProducts(data || []);
            }
            setLoading(false);
        }

        fetchCategoryProducts();
    }, [slug]);

    // 2. Client-Side Filtering
    useEffect(() => {
        let results = [...products];

        // Filter by Brand
        if (activeFilters.brand.length > 0) {
            results = results.filter(p => {
                const brandMatch = activeFilters.brand.some(brand =>
                    p.name.toLowerCase().includes(brand.toLowerCase())
                );
                return brandMatch;
            });
        }

        // Filter by Price
        if (activeFilters.priceRange.min !== '') {
            results = results.filter(p => p.cash_price >= (activeFilters.priceRange.min as number));
        }
        if (activeFilters.priceRange.max !== '') {
            results = results.filter(p => p.cash_price <= (activeFilters.priceRange.max as number));
        }

        // Filter by Stock
        if (activeFilters.stock.length > 0) {
            results = results.filter(p => activeFilters.stock.includes(p.stock_status));
        }

        setFilteredProducts(results);
    }, [products, activeFilters]);

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
                <ProductFilters
                    mobileFiltersOpen={mobileFiltersOpen}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                    hideCategoryFilter={true}
                    mode="mobile"
                />

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900">
                            {categoryTitle}
                        </h1>

                        <div className="flex items-center">
                            <ProductSort />
                        </div>
                    </div>

                    {/* Mobile Header & Sticky Bar */}
                    <div className="lg:hidden pt-4 pb-4">
                        <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900 mb-4 px-2">
                            {categoryTitle}
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
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Desktop Sidebar Filters */}
                            <div className="hidden lg:block">
                                <ProductFilters
                                    mobileFiltersOpen={false}
                                    setMobileFiltersOpen={() => { }}
                                    activeFilters={activeFilters}
                                    onFilterChange={setActiveFilters}
                                    hideCategoryFilter={true}
                                    mode="desktop"
                                />
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        {/* Mobile Grid (2 columns) */}
                                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
                                            {filteredProducts.map((product) => (
                                                <ProductCardMobile
                                                    key={product.id}
                                                    product={product}
                                                    onAddToWishlist={handleAddToWishlist}
                                                />
                                            ))}
                                        </div>

                                        {/* Desktop Grid (3 columns) */}
                                        <div className="hidden lg:grid grid-cols-3 xl:gap-8 gap-y-10">
                                            {filteredProducts.map((product) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                    onQuickView={handleQuickView}
                                                    onAddToWishlist={handleAddToWishlist}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                                        <p className="text-gray-500 text-lg">No products found in this category.</p>
                                    </div>
                                )}
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
