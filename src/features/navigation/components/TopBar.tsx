'use client';

import Link from 'next/link';
import { FiPhone, FiMapPin, FiUser, FiShoppingCart } from 'react-icons/fi';

export function TopBar() {
    return (
        <div className="bg-primary-700 text-white py-2 text-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Left: Contact Info */}
                    <div className="flex items-center gap-6">
                        <a
                            href="tel:+94771234567"
                            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                        >
                            <FiPhone className="w-4 h-4" />
                            <span className="hidden sm:inline">Hotline: +94 77 123 4567</span>
                        </a>

                        <div className="flex items-center gap-2">
                            <FiMapPin className="w-4 h-4" />
                            <span className="hidden md:inline">Free Delivery (Western Province)</span>
                            <span className="md:hidden">Free Delivery (WP)</span>
                        </div>
                    </div>

                    {/* Right: Account & Cart */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/account"
                            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                        >
                            <FiUser className="w-4 h-4" />
                            <span className="hidden sm:inline">Account</span>
                        </Link>

                        <Link
                            href="/cart"
                            className="flex items-center gap-2 hover:text-primary-200 transition-colors relative"
                        >
                            <FiShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Cart</span>
                            {/* Cart badge - will be dynamic later */}
                            <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
