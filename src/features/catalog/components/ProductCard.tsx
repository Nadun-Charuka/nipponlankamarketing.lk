'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/shared/types/database';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { cn } from '@/shared/lib/utils';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const isOutOfStock = product.stock_status === 'out_of_stock';

    return (
        <Link
            href={`/products/${product.slug}`}
            className={cn(
                'card group cursor-pointer',
                isOutOfStock && 'opacity-60',
                className
            )}
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {product.featured_image ? (
                    <Image
                        src={product.featured_image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.is_featured && (
                        <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ⭐ Featured
                        </span>
                    )}
                    {isOutOfStock && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Out of Stock
                        </span>
                    )}
                    {product.stock_status === 'pre_order' && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Pre-Order
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                {/* Product Name */}
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Pricing */}
                <DualPriceDisplay
                    basePrice={product.base_price}
                    installmentMonths={product.installment_months}
                    variant="card"
                />

                {/* View Details Link */}
                <div className="pt-2">
                    <span className="text-primary-600 text-sm font-semibold group-hover:underline">
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    );
}
