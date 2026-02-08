'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiShoppingCart, FiGrid, FiHeart } from 'react-icons/fi';
import { MobileMenu } from './MobileMenu';
import { supabase } from '@/shared/lib/supabase';
import { getIconComponent } from '@/shared/utils/iconMapper';
import { useCart } from '@/features/cart/context/CartContext';
import { useWishlist } from '@/features/wishlist/context/WishlistContext';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon_name: string | null;
}

export function MainNav() {
    const router = useRouter();
    const { itemCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

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

    // Scroll detection with throttling for better performance
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    setIsScrolled(scrollTop > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Live search state
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Debounced search
    useEffect(() => {
        const searchProducts = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([]);
                setShowDropdown(false);
                return;
            }

            setIsSearching(true);
            setShowDropdown(true);

            const { data, error } = await supabase
                .from('products')
                .select('id, name, slug, base_price, featured_image')
                .eq('is_active', true)
                .ilike('name', `%${searchQuery.trim()}%`)
                .limit(5);

            if (!error && data) {
                setSearchResults(data);
            }
            setIsSearching(false);
        };

        const debounceTimer = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.search-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowDropdown(false);
        }
    };

    const handleResultClick = (slug: string) => {
        router.push(`/products/${slug}`);
        setSearchQuery('');
        setShowDropdown(false);
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

                        {/* Live Search Bar with Dropdown */}
                        <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-2xl mx-8 search-container">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-gray-300 shadow-sm"
                                    placeholder="What are you looking for?"
                                />

                                {/* Search Dropdown */}
                                {showDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto z-50">
                                        {isSearching ? (
                                            <div className="p-4 text-center text-gray-500">
                                                <div className="inline-block w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="ml-2">Searching...</span>
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            <>
                                                {searchResults.map((product) => (
                                                    <button
                                                        key={product.id}
                                                        type="button"
                                                        onClick={() => handleResultClick(product.slug)}
                                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                                                    >
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                            {product.featured_image ? (
                                                                <img
                                                                    src={product.featured_image}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="text-2xl">📦</span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-xs text-primary-600 font-semibold">
                                                                Rs. {product.base_price.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                                <button
                                                    type="submit"
                                                    className="w-full p-3 text-center text-sm text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                                                >
                                                    View all results for "{searchQuery}"
                                                </button>
                                            </>
                                        ) : searchQuery.length >= 2 ? (
                                            <div className="p-8 text-center text-gray-500">
                                                <div className="text-4xl mb-2">🔍</div>
                                                <div className="text-sm">No products found</div>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Action Icons */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Wishlist Icon */}
                            <Link
                                href="/wishlist"
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                                aria-label="Wishlist"
                            >
                                <FiHeart className="w-5 h-5 text-gray-700" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-scaleIn">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart Icon */}
                            {/* Cart Icon */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                                aria-label="Shopping Cart"
                            >
                                <FiShoppingCart className="w-5 h-5 text-gray-700" />
                                {/* Cart badge */}
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-scaleIn">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setIsMobileSearchOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Search"
                            >
                                <FiSearch className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Category Icons Bar - Hidden when scrolled - Grid-based for smooth animation */}
                    <div
                        className="hidden lg:grid border-t border-gray-100 transition-all duration-200 ease-out"
                        style={{
                            gridTemplateRows: isScrolled ? '0fr' : '1fr',
                            opacity: isScrolled ? 0 : 1,
                        }}
                    >
                        <div className="overflow-hidden">
                            <div className="flex items-center justify-center gap-8 py-4">
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

            {/* Mobile Search Modal */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileSearchOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white h-full flex flex-col animate-slideDown">
                        {/* Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                            <button
                                onClick={() => setIsMobileSearchOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-lg font-semibold text-gray-900">Search Products</h2>
                        </div>

                        {/* Search Input */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Search for products..."
                                />
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="flex-1 overflow-y-auto">
                            {isSearching ? (
                                <div className="p-8 text-center text-gray-500">
                                    <div className="inline-block w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                    <p>Searching...</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {searchResults.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => {
                                                handleResultClick(product.slug);
                                                setIsMobileSearchOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                                        >
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                {product.featured_image ? (
                                                    <img
                                                        src={product.featured_image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-3xl">📦</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                    {product.name}
                                                </div>
                                                <div className="text-sm text-primary-600 font-semibold mt-1">
                                                    Rs. {product.base_price.toLocaleString()}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            if (searchQuery.trim()) {
                                                router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                                                setIsMobileSearchOpen(false);
                                                setSearchQuery('');
                                            }
                                        }}
                                        className="w-full p-4 text-center text-sm text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                                    >
                                        View all results for "{searchQuery}"
                                    </button>
                                </div>
                            ) : searchQuery.length >= 2 ? (
                                <div className="p-12 text-center text-gray-500">
                                    <div className="text-6xl mb-3">🔍</div>
                                    <div className="text-base font-medium">No products found</div>
                                    <div className="text-sm mt-1">Try different keywords</div>
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-400">
                                    <div className="text-6xl mb-3">🔎</div>
                                    <div className="text-base">Start typing to search</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
