'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';

interface RelatedProductsProps {
    categoryId: string | null;
    currentProductId: string;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRelated() {
            if (!categoryId) {
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .eq('category_id', categoryId)
                .neq('id', currentProductId)
                .limit(4);

            if (error) {
                console.error('Error fetching related products:', error);
            } else if (data) {
                setProducts(data);
            }
            setIsLoading(false);
        }

        fetchRelated();
    }, [categoryId, currentProductId]);

    if (!isLoading && products.length === 0) {
        return null; // Don't show section if no related products found
    }

    return (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        You Might Also Like
                    </h2>
                    <p className="text-gray-500">
                        Discover more items similar to what you're viewing
                    </p>
                </div>

                {isLoading ? (
                    // Simple loading skeleton
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
