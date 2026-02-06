'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiBox, FiGrid } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import { LogoLoader } from '@/shared/components/LogoLoader';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setIsLoading(true);

            // Fetch product count
            const { count: productCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            // Fetch category count
            const { count: categoryCount } = await supabase
                .from('categories')
                .select('*', { count: 'exact', head: true });

            setStats({
                totalProducts: productCount || 0,
                totalCategories: categoryCount || 0
            });

            setIsLoading(false);
        }

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LogoLoader />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Manage your product catalog and categories. View statistics and access management tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Stats Card */}
                <div className="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                        <FiBox className="h-7 w-7 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Products</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{stats.totalProducts}</p>
                    <p className="text-sm text-gray-500 mb-6">Total items in catalog</p>

                    <Link
                        href="/admin/products"
                        className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>

                {/* Category Stats Card */}
                <div className="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                        <FiGrid className="h-7 w-7 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Categories</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{stats.totalCategories}</p>
                    <p className="text-sm text-gray-500 mb-6">Total product categories</p>

                    <Link
                        href="/admin/categories"
                        className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Manage Categories
                    </Link>
                </div>
            </div>
        </div>
    );
}
