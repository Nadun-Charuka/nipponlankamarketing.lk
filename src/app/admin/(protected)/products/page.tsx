'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { ProductListTable } from '@/features/admin/components/ProductListTable';
import { supabase } from '@/shared/lib/supabase';
import { Product } from '@/shared/types/database';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState<'featured' | 'new_arrival' | ''>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [productsResult, categoriesResult] = await Promise.all([
                supabase.from('products').select('*').order('created_at', { ascending: false }),
                supabase.from('categories').select('id, name').order('name')
            ]);

            if (productsResult.error) throw productsResult.error;
            if (categoriesResult.error) throw categoriesResult.error;

            setProducts(productsResult.data || []);
            setCategories(categoriesResult.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error('Failed to delete product');
        } else {
            setProducts(products.filter(p => p.id !== id));
            toast.success('Product deleted successfully');
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category_id && p.category_id.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = !categoryFilter || p.category_id === categoryFilter;
        const matchesStatus = !statusFilter || p.stock_status === statusFilter;
        const matchesType = !typeFilter || (typeFilter === 'featured' ? p.is_featured : typeFilter === 'new_arrival' ? p.is_new : true);

        return matchesSearch && matchesCategory && matchesStatus && matchesType;
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your store catalog</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <FiDownload className="mr-2 -ml-1 h-4 w-4" />
                        Export
                    </button>
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
                    >
                        <FiPlus className="mr-2 -ml-1 h-4 w-4" />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder="Search by name, SKU, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        className={`block w-auto min-w-[150px] pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg cursor-pointer ${typeFilter
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                    >
                        <option value="">All Types</option>
                        <option value="featured">Featured</option>
                        <option value="new_arrival">New Arrival</option>
                    </select>
                    <select
                        className={`block w-auto min-w-[180px] pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg cursor-pointer ${categoryFilter
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        className={`block w-auto min-w-[150px] pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg cursor-pointer ${statusFilter
                                ? 'bg-purple-50 border-purple-500 text-purple-700 font-medium'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="pre_order">Pre Order</option>
                    </select>
                </div>
            </div>

            <ProductListTable
                products={filteredProducts}
                categories={categories}
                isLoading={isLoading}
                onDelete={handleDelete}
            />
        </div>
    );
}
