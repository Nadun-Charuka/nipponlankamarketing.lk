'use client';

import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { ProductFilters, ProductSort, ProductCard, ProductCardMobile, QuickViewModal, FilterState } from '@/features/catalog/components';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search'); // 'q' or 'search'

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter State
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        category: [] as string[],
        brand: [] as string[],
        priceRange: { min: '' as number | '', max: '' as number | '' },
        stock: [] as string[],
    });

    // 1. Fetch Products
    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
            } else {
                setProducts(data || []);
                setFilteredProducts(data || []); // Initial load
            }
            setIsLoading(false);
        }
        fetchProducts();
    }, []);

    // 2. Client-Side Filtering Effect
    useEffect(() => {
        let results = [...products];

        // Filter by Search Query
        if (searchQuery) {
            const queryTerms = searchQuery.toLowerCase().replace(/-/g, ' ').split(' ').filter(Boolean);
            results = results.filter(p => {
                const name = p.name?.toLowerCase() || '';
                const description = p.description?.toLowerCase() || '';
                const category = p.category_id?.toLowerCase().replace(/-/g, ' ') || '';

                return queryTerms.every(term =>
                    name.includes(term) || description.includes(term) || category.includes(term)
                );
            });
        }

        // Filter by Category
        if (activeFilters.category && activeFilters.category.length > 0) {
            results = results.filter(p => p.category_id && activeFilters.category!.includes(p.category_id));
        }

        // Filter by Brand (Mock logic: checking if name contains brand)
        if (activeFilters.brand.length > 0) {
            results = results.filter(p => {
                const brandMatch = activeFilters.brand.some((brand: string) =>
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
    }, [products, searchQuery, activeFilters]);

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
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
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
                                    activeFilters={activeFilters}
                                    onFilterChange={setActiveFilters}
                                    mode="desktop"
                                />
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
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
