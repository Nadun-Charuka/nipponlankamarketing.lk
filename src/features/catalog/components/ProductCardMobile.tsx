'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { Product } from '@/shared/types/database';

interface ProductCardMobileProps {
    product: Product;
    onAddToWishlist?: (productId: string) => void;
}

export function ProductCardMobile({ product, onAddToWishlist }: ProductCardMobileProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        onAddToWishlist?.(product.id);
    };

    const cashPrice = product.base_price * 0.8;
    const monthlyInstallment = product.base_price / product.installment_months;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price).replace('LKR', 'Rs.');
    };

    return (
        <Link href={`/products/${product.slug}`} className="group block bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm active:scale-[0.98] transition-all duration-200">
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50 border-b border-gray-100">
                {/* Wishlist Button (Always Visible) */}
                <button
                    onClick={handleWishlistClick}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-400 active:text-accent-red active:bg-red-50 transition-colors"
                >
                    <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-accent-red text-accent-red' : ''}`} />
                </button>

                {/* Discount Badge */}
                {product.base_price > cashPrice && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-accent-red text-white text-[10px] font-bold rounded shadow-sm z-10">
                        -20%
                    </span>
                )}

                {/* Placeholder Image */}
                <div className="w-full h-full flex items-center justify-center text-4xl">
                    📦
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Brand */}
                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Samsung
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-[2.5rem] leading-tight mb-2">
                    {product.name}
                </h3>

                {/* Pricing */}
                <div className="space-y-0.5">
                    {/* Cash Price */}
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-accent-red">
                            {formatPrice(cashPrice)}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through decoration-gray-400/60">
                            {formatPrice(product.base_price)}
                        </span>
                    </div>

                    {/* Installment Hint */}
                    <div className="text-[10px] font-medium text-primary-700 bg-primary-50 inline-block px-1.5 py-0.5 rounded">
                        {formatPrice(monthlyInstallment)} × 12
                    </div>
                </div>
            </div>
        </Link>
    );
}
