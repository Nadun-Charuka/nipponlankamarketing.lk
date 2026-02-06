'use client';

import { ProductForm } from '@/features/admin/components/ProductForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                    <p className="text-sm text-gray-500">Create a new item in your catalog</p>
                </div>
            </div>

            <ProductForm />
        </div>
    );
}
