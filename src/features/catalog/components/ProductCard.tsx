'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { Product } from '@/shared/types/database';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { useCart } from '@/features/cart/context/CartContext';
import { useWishlist } from '@/features/wishlist/context/WishlistContext';

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    onAddToWishlist?: (productId: string) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product, 1, { openDrawer: false });
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleWishlist(product);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        onQuickView?.(product);
    };

    const getStockBadge = () => {
        switch (product.stock_status) {
            case 'out_of_stock':
                return (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900 text-white text-[10px] uppercase font-bold tracking-wider rounded-sm z-10">
                        Sold Out
                    </span>
                );
            case 'pre_order':
                return (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider rounded-sm z-10">
                        Pre Order
                    </span>
                );
            default:
                // Default badge like "Warranty" or "Official Agent"
                return (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent-gold text-white text-[10px] uppercase font-bold tracking-wider rounded-sm z-10">
                        Official Warranty
                    </span>
                );
        }
    };

    return (
        <div className="group relative bg-white border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-200 rounded-lg overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/products/${product.slug}`} className="relative aspect-square bg-white border-b border-gray-100 overflow-hidden">
                {/* Placeholder Image */}
                <div className="w-full h-full flex items-center justify-center bg-gray-50 group-hover:scale-105 transition-transform duration-300">
                    {product.featured_image && (product.featured_image.startsWith('http') || product.featured_image.startsWith('https')) ? (
                        <Image
                            src={product.featured_image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="text-center text-gray-300">
                            <div className="text-6xl mb-2">📦</div>
                        </div>
                    )}
                </div>

                {/* Badges */}
                {getStockBadge()}

                {product.is_featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent-red text-white text-[10px] uppercase font-bold tracking-wider rounded-sm shadow-sm z-10">
                        -20%
                    </span>
                )}

                {product.is_new && (
                    <span className="absolute top-10 right-2 px-2 py-0.5 bg-green-600 text-white text-[10px] uppercase font-bold tracking-wider rounded-sm shadow-sm z-10">
                        NEW
                    </span>
                )}

                {/* Quick Actions Overlay (Desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:flex justify-center gap-2 bg-white/90 backdrop-blur-sm border-t border-gray-100">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-xs font-bold py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        <FiShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                    <button
                        onClick={handleQuickView}
                        className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-colors"
                        aria-label="Quick View"
                    >
                        <FiEye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleWishlistClick}
                        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:border-accent-red hover:text-accent-red transition-colors ${isWishlisted ? 'text-accent-red border-accent-red' : 'text-gray-400'}`}
                        aria-label="Add to Wishlist"
                    >
                        <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
                {/* Category & Brand (Optional) */}
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Samsung
                </div>

                {/* Product Name */}
                <Link href={`/products/${product.slug}`} className="mb-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary-700 transition-colors leading-snug min-h-[2.5em]">
                        {product.name}
                    </h3>
                </Link>

                {/* Pricing Table */}
                <div className="mt-auto">
                    <DualPriceDisplay basePrice={product.base_price} variant="card" />
                </div>

                {/* Mobile Action Buttons */}
                <div className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white text-xs font-bold py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        <FiShoppingCart className="w-3 h-3" /> Add
                    </button>
                    <button className="bg-gray-100 text-gray-900 text-xs font-bold py-2 rounded hover:bg-gray-200 transition-colors">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}
