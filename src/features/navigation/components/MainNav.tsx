'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';

export function MainNav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const menuItems = [
        {
            id: 'televisions',
            label: 'Televisions',
            href: '/category/televisions',
        },
        {
            id: 'refrigerators',
            label: 'Refrigerators',
            href: '/category/refrigerators',
        },
        {
            id: 'washing-machines',
            label: 'Washing Machines',
            href: '/category/washing-machines',
        },
        {
            id: 'air-conditioners',
            label: 'Air Conditioners',
            href: '/category/air-conditioners',
        },
        {
            id: 'furniture',
            label: 'Furniture',
            href: '/category/furniture',
        },
        {
            id: 'kitchen',
            label: 'Kitchen',
            href: '/category/kitchen',
        },
    ];

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <FiMenu className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">NL</span>
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-display font-bold text-xl text-primary-700">
                                    Nippon Lanka
                                </div>
                                <div className="text-xs text-gray-500 -mt-1">Marketing</div>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-1">
                            {menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative"
                                    onMouseEnter={() => setActiveMenu(item.id)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors rounded-lg hover:bg-primary-50"
                                    >
                                        {item.label}
                                    </Link>

                                    {/* Mega Menu Dropdown */}
                                    {activeMenu === item.id && (
                                        <MegaMenu categoryId={item.id} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Search"
                        >
                            <FiSearch className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                menuItems={menuItems}
            />

            {/* Search Modal */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
