'use client';

import { FiEdit2, FiTrash2, FiMoreVertical, FiEye } from 'react-icons/fi';
import { Product } from '@/shared/types/database';
import Link from 'next/link';

interface ProductListTableProps {
    products: Product[];
    categories: { id: string; name: string }[];
    isLoading: boolean;
    onDelete: (id: string) => void;
}

export function ProductListTable({ products, categories, isLoading, onDelete }: ProductListTableProps) {
    if (isLoading) {
        return (
            <div className="bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                            <div className="ml-4 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="whitespace-nowrap px-3 py-4"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-right"><div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="mx-auto h-12 w-12 text-gray-400 text-4xl">📦</div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
            </div>
        );
    }

    return (
        <div className="bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Product
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Price
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Stock
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                                            {/* In real app, render <Image> */}
                                            {product.featured_image ? '🖼️' : '📦'}
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-medium text-gray-900 max-w-[200px] truncate" title={product.name}>
                                                {product.name}
                                            </div>
                                            <div className="text-gray-500 text-xs">{product.sku || 'No SKU'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                        {categories.find(c => c.id === product.category_id)?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="font-medium text-gray-900">Rs. {product.cash_price.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400 line-through">Rs. {product.base_price.toLocaleString()}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock_status === 'in_stock'
                                        ? 'bg-green-100 text-green-800'
                                        : product.stock_status === 'out_of_stock'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {product.stock_status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="text-primary-600 hover:text-primary-900 p-2 hover:bg-primary-50 rounded-lg"
                                            title="Edit"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg"
                                            title="Delete"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Simple Pagination Footer could go here */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of <span className="font-medium">{products.length}</span> results
                </div>
                <div className="flex-1 flex justify-end">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
