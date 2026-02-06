'use client';

import Link from 'next/link';
import {
    FiMonitor,
    FiPackage,
    FiWind,
    FiHome,
    FiShoppingBag,
    FiCoffee
} from 'react-icons/fi';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    productCount: number;
    href: string;
    color: string;
}

const categories: Category[] = [
    {
        id: 'televisions',
        name: 'Televisions',
        icon: <FiMonitor className="w-12 h-12" />,
        productCount: 45,
        href: '/category/televisions',
        color: 'from-blue-500 to-blue-600',
    },
    {
        id: 'refrigerators',
        name: 'Refrigerators',
        icon: <FiPackage className="w-12 h-12" />,
        productCount: 32,
        href: '/category/refrigerators',
        color: 'from-cyan-500 to-cyan-600',
    },
    {
        id: 'washing-machines',
        name: 'Washing Machines',
        icon: <FiWind className="w-12 h-12" />,
        productCount: 28,
        href: '/category/washing-machines',
        color: 'from-purple-500 to-purple-600',
    },
    {
        id: 'air-conditioners',
        name: 'Air Conditioners',
        icon: <FiWind className="w-12 h-12" />,
        productCount: 18,
        href: '/category/air-conditioners',
        color: 'from-teal-500 to-teal-600',
    },
    {
        id: 'furniture',
        name: 'Furniture',
        icon: <FiHome className="w-12 h-12" />,
        productCount: 56,
        href: '/category/furniture',
        color: 'from-amber-500 to-amber-600',
    },
    {
        id: 'kitchen',
        name: 'Kitchen Appliances',
        icon: <FiCoffee className="w-12 h-12" />,
        productCount: 64,
        href: '/category/kitchen',
        color: 'from-rose-500 to-rose-600',
    },
];

export function CategoryGrid() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Browse by Category
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find the perfect products for your home from our wide range of categories
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className="group"
                        >
                            <div className="relative bg-white rounded-2xl border-2 border-gray-100 p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1">
                                {/* Icon Container */}
                                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {category.icon}
                                </div>

                                {/* Category Name */}
                                <h3 className="text-center font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {category.name}
                                </h3>

                                {/* Product Count */}
                                <p className="text-center text-sm text-gray-500">
                                    {category.productCount} products
                                </p>

                                {/* Hover Arrow */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                                        <span className="text-primary-600 text-sm">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg group"
                    >
                        View All Categories
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
