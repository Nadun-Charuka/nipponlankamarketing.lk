'use client';

import Link from 'next/link';
import { useWishlist } from '@/features/wishlist/context/WishlistContext';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { FiHeart } from 'react-icons/fi';

export default function WishlistPage() {
    const { wishlistItems } = useWishlist();

    if (wishlistItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiHeart className="w-10 h-10 text-gray-400" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    Looks like you haven't added any items to your wishlist yet.
                </p>
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Wishlist</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlistItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
