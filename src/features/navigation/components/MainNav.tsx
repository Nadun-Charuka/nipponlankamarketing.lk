'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiShoppingCart, FiGrid } from 'react-icons/fi';
import { MobileMenu } from './MobileMenu';
import { supabase } from '@/shared/lib/supabase';
import { getIconComponent } from '@/shared/utils/iconMapper';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon_name: string | null;
}

export function MainNav() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Load first 9 categories from database
    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name, slug, icon_name')
                .eq('is_active', true)
                .order('display_order', { ascending: true })
                .limit(9); // First 9 categories

            if (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            } else {
                setCategories(data || []);
            }
        }

        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <FiMenu className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">NL</span>
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-display font-bold text-2xl text-primary-700">
                                    Nippon Lanka
                                </div>
                                <div className="text-xs text-gray-500 -mt-1">Marketing</div>
                            </div>
                        </Link>

                        {/* Prominent Search Bar */}
                        <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-gray-300 shadow-sm"
                                    placeholder="What are you looking for?"
                                />
                            </div>
                        </form>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Mobile Search */}
                            <Link
                                href="/products"
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Search"
                            >
                                <FiSearch className="w-5 h-5 text-gray-700" />
                            </Link>
                        </div>
                    </div>

                    {/* Category Icons Bar */}
                    <div className="hidden lg:flex items-center justify-center gap-8 py-4 border-t border-gray-100">
                        {/* First 9 Categories */}
                        {categories.map((category) => {
                            const IconComponent = getIconComponent(category.icon_name);
                            return (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="flex flex-col items-center gap-2 group min-w-[80px]"
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                        <IconComponent className="w-7 h-7 text-primary-600 group-hover:text-primary-700 transition-colors" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-primary-600 transition-colors text-center">
                                        {category.name}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* 10th Item: All Products */}
                        <Link
                            href="/products"
                            className="flex flex-col items-center gap-2 group min-w-[80px]"
                        >
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <FiGrid className="w-7 h-7 text-gray-600 group-hover:text-gray-700 transition-colors" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-center">
                                All Products
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                menuItems={[
                    ...categories.map(cat => ({
                        id: cat.id,
                        label: cat.name,
                        href: `/category/${cat.slug}`
                    })),
                    {
                        id: 'all-products',
                        label: 'All Products',
                        href: '/products'
                    }
                ]}
            />
        </>
    );
}
