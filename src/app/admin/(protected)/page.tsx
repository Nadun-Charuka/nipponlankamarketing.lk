'use client';

import Link from 'next/link';
import { FiBox } from 'react-icons/fi';
import { allProducts } from '@/shared/data/products';

export default function AdminDashboardPage() {
    const totalProducts = allProducts.length;

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Manage your product catalog and inventory. Currently simplified to focus on Product Management.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Stats Card */}
                <div className="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
                    <div className="h-14 w-14 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                        <FiBox className="h-7 w-7 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Products</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{totalProducts}</p>
                    <p className="text-sm text-gray-500 mb-6">Total items in catalog</p>

                    <Link
                        href="/admin/products"
                        className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>

                {/* Placeholder for future */}
                <div className="bg-gray-50 overflow-hidden rounded-xl border border-gray-200 border-dashed p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-gray-400 font-medium">More analytics coming soon...</p>
                </div>
            </div>
        </div>
    );
}
