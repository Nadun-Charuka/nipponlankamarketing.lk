'use client';

import { useState } from 'react';
import { FiHeart, FiShare2, FiTruck, FiShield, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Product } from '@/shared/types/database';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import toast from 'react-hot-toast';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

    const handleWhatsAppClick = () => {
        const message = `Hi, I'm interested in the ${product.name}. Is it available?`;
        const url = `https://wa.me/94771234567?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleBuyNow = () => {
        toast.success('Added to cart & redirecting to checkout...');
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
                <div className="flex items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            onClick={handleDecrement}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            -
                        </button>
                        <span className="px-3 py-2 font-medium text-gray-900 w-12 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart / Buy Now */}
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        Buy Now
                    </button>

                    {/* Wishlist */}
                    <button className="p-3 border border-gray-300 rounded-lg md:text-gray-400 hover:text-accent-red hover:border-accent-red transition-colors">
                        <FiHeart className="w-6 h-6" />
                    </button>
                </div>

                {/* WhatsApp Button */}
                <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                    <FaWhatsapp className="w-5 h-5" />
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
