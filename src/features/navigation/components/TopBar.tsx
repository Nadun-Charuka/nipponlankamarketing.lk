'use client';

import Link from 'next/link';
import { FiPhone, FiMapPin, FiUser } from 'react-icons/fi';

export function TopBar() {
    return (
        <div className="bg-primary-700 text-white py-2 text-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Left: Contact Info */}
                    <div className="flex items-center gap-6">
                        <a
                            href="tel:+94723728550"
                            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                        >
                            <FiPhone className="w-4 h-4" />
                            <span className="hidden sm:inline">Hotline: +94 72 372 8550</span>
                        </a>

                        <div className="flex items-center gap-2">
                            <FiMapPin className="w-4 h-4" />
                            <span className="hidden md:inline">Free Delivery (Western Province)</span>
                            <span className="md:hidden">Free Delivery (WP)</span>
                        </div>
                    </div>

                    {/* Right: Admin Login Only */}
                    <Link
                        href="/admin/login"
                        className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                    >
                        <FiUser className="w-4 h-4" />
                        <span className="hidden sm:inline">Login / Admin</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
