'use client';

import { useState } from 'react';
import { FiHeart, FiShare2, FiTruck, FiShield, FiCheckCircle, FiShoppingCart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/shared/types/database';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import toast from 'react-hot-toast';
import { useCart } from '@/features/cart/context/CartContext';
import { useWishlist } from '@/features/wishlist/context/WishlistContext';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

    const handleWishlistClick = () => {
        toggleWishlist(product);
    };

    const handleWhatsAppClick = () => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL || 'https://nipponlanka.vercel.app');
        const productUrl = `${baseUrl}/products/${product.slug}`;
        const message = `Hi, I'm interested in the ${product.name}. Is it available?\n\n${productUrl}`;
        const url = `https://wa.me/94723728550?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity, { openDrawer: true });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 text-sm">
                            {product.brand && (
                                <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full font-medium">
                                    {product.brand}
                                </span>
                            )}
                            <span className={`font-medium ${product.stock_status === 'in_stock' ? 'text-green-600' : 'text-red-500'}`}>
                                {product.stock_status === 'in_stock' ? 'In Stock' : product.stock_status === 'pre_order' ? 'Pre Order' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Display */}
            <DualPriceDisplay
                basePrice={product.base_price}
                installmentMonths={product.installment_months}
                variant="detail"
            />

            {/* Actions */}
            <div className="border-t border-b border-gray-100 py-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Row 1 Mobile: Quantity + Wishlist */}
                    <div className="flex gap-4 sm:contents">
                        {/* Quantity */}
                        <div className="flex-1 sm:flex-none flex items-center justify-between sm:justify-start border border-gray-300 rounded-xl">
                            <button
                                onClick={handleDecrement}
                                className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                -
                            </button>
                            <span className="px-4 py-3 font-medium text-gray-900 w-12 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                +
                            </button>
                        </div>

                        {/* Wishlist - Mobile Only */}
                        <button
                            onClick={handleWishlistClick}
                            className={`sm:hidden p-3.5 border rounded-xl transition-colors ${isWishlisted ? 'border-accent-red text-accent-red hover:bg-red-50' : 'border-gray-300 text-gray-400 hover:text-accent-red hover:border-accent-red'}`}
                        >
                            <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    {/* Row 2 Mobile: Buttons */}
                    <div className="flex gap-4 sm:contents">
                        {/* Add to Cart - Secondary Action */}
                        {/* Add to Cart - Secondary Action */}
                        <button
                            onClick={() => product.stock_status !== 'out_of_stock' && addToCart(product, quantity, { openDrawer: false })}
                            disabled={product.stock_status === 'out_of_stock'}
                            className={`flex-1 font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-base
                                ${product.stock_status === 'out_of_stock'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                                    : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]'
                                }`}
                            aria-label="Add to Cart"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                            <span className="hidden sm:inline">Add</span>
                        </button>

                        {/* Buy Now - Primary Action */}
                        <button
                            onClick={() => product.stock_status !== 'out_of_stock' && handleBuyNow()}
                            disabled={product.stock_status === 'out_of_stock'}
                            className={`flex-1 font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg text-base
                                ${product.stock_status === 'out_of_stock'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                                    : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl active:scale-[0.98]'
                                }`}
                        >
                            {product.stock_status === 'out_of_stock' ? 'Out of Stock' : 'Buy Now'}
                        </button>
                    </div>

                    {/* Wishlist - Desktop Only */}
                    <button
                        onClick={handleWishlistClick}
                        className={`hidden sm:block p-3.5 border rounded-xl transition-colors ${isWishlisted ? 'border-accent-red text-accent-red hover:bg-red-50' : 'border-gray-300 text-gray-400 hover:text-accent-red hover:border-accent-red'}`}
                    >
                        <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Privacy Policy & Installment Info Link */}
                <div className="text-center">
                    <a href="/privacy-policy" target="_blank" className="text-xs text-gray-500 hover:text-primary-600 underline decoration-dotted transition-colors">
                        View Installment Policy & Document Requirements
                    </a>
                </div>

                {/* WhatsApp Button */}
                <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-base"
                >
                    <FaWhatsapp className="w-6 h-6" />
                    Chat on WhatsApp
                </button>
            </div>

            {/* Perks / Trust Signals */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FiTruck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Free Delivery</h4>
                        <p className="text-xs text-gray-500">Colombo, Gampaha, Kalutara</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <FiShield className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Official Warranty</h4>
                        <p className="text-xs text-gray-500">Genuine Products</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <FiCheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Original Products</h4>
                        <p className="text-xs text-gray-500">100% Genuine Guaranteed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
