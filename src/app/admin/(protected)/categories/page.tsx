'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import { getIconComponent } from '@/shared/utils/iconMapper';
import toast from 'react-hot-toast';
import { LogoLoader } from '@/shared/components/LogoLoader';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon_name: string | null;
    display_order: number;
    is_active: boolean;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reorderingId, setReorderingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            toast.error('Failed to load categories');
            console.error(error);
        } else {
            setCategories(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This will affect all products in this category.`)) {
            return;
        }

        setDeletingId(id);

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) {
            if (error.code === '23503') { // Foreign key violation
                toast.error('Cannot delete: This category contains products. Please delete or move them first.');
            } else {
                toast.error('Failed to delete category');
            }
            console.error(error);
        } else {
            toast.success('Category deleted successfully');
            fetchCategories();
        }

        setDeletingId(null);
    };

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = categories.findIndex(c => c.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= categories.length) return;

        // Set loading state
        setReorderingId(id);

        // Optimistic UI update - show change immediately
        const newCategories = [...categories];
        [newCategories[currentIndex], newCategories[newIndex]] = [newCategories[newIndex], newCategories[currentIndex]];
        setCategories(newCategories);

        // Update display_order for both categories
        const updates = newCategories.map((cat, index) => ({
            id: cat.id,
            display_order: index + 1
        }));

        try {
            for (const update of updates) {
                await supabase
                    .from('categories')
                    .update({ display_order: update.display_order })
                    .eq('id', update.id);
            }

            toast.success('Order updated');
        } catch (error) {
            toast.error('Failed to update order');
            // Revert on error
            fetchCategories();
        } finally {
            setReorderingId(null);
        }
    };

    const handleToggleActive = async (category: Category) => {
        if (togglingId) return;

        // If turning ON, check limit
        if (!category.is_active) {
            const activeCount = categories.filter(c => c.is_active).length;
            if (activeCount >= 9) {
                toast.error('Maximum 9 categories can be active in Navbar');
                return;
            }
        }

        setTogglingId(category.id);

        try {
            const { error } = await supabase
                .from('categories')
                .update({ is_active: !category.is_active })
                .eq('id', category.id);

            if (error) throw error;

            // Update local state
            setCategories(categories.map(c =>
                c.id === category.id ? { ...c, is_active: !c.is_active } : c
            ));

            toast.success(`Category ${!category.is_active ? 'activated' : 'deactivated'}`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status');
        } finally {
            setTogglingId(null);
        }
    };

    const handleFixOrder = async () => {
        if (!confirm('This will re-order all categories sequentially starting from 1 based on their current position. Continue?')) {
            return;
        }

        setIsLoading(true);

        try {
            // Create updates with sequential order
            const updates = categories.map((cat, index) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                // We must include other required fields for upsert if we don't want to lose them or if RLS/constraints require them
                // But generally partial update via upsert works if ID matches
                display_order: index + 1,
            }));

            // Supabase upsert to update multiple rows
            const { error } = await supabase
                .from('categories')
                .upsert(updates, { onConflict: 'id' });

            if (error) throw error;

            toast.success('Category order fixed successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error fixing order:', error);
            toast.error('Failed to fix order');
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LogoLoader />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-1">Manage product categories and navbar display</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleFixOrder}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                        title="Reset display order numbers sequentially"
                    >
                        <span className="text-sm">Fix Order</span>
                    </button>
                    <Link
                        href="/admin/categories/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <FiPlus className="w-5 h-5" />
                        Add Category
                    </Link>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Icon
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category, index) => {
                            const IconComponent = getIconComponent(category.icon_name);
                            return (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                {category.display_order}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleReorder(category.id, 'up')}
                                                    disabled={index === 0 || reorderingId !== null}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all relative"
                                                >
                                                    {reorderingId === category.id ? (
                                                        <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <FiArrowUp className="w-3 h-3" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleReorder(category.id, 'down')}
                                                    disabled={index === categories.length - 1 || reorderingId !== null}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all relative"
                                                >
                                                    {reorderingId === category.id ? (
                                                        <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <FiArrowDown className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                                            <IconComponent className="w-5 h-5 text-primary-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{category.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleToggleActive(category)}
                                            disabled={togglingId === category.id}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${category.is_active ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${category.is_active ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/categories/${category.id}`}
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id, category.name)}
                                                disabled={deletingId === category.id}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
                                            >
                                                {deletingId === category.id ? (
                                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <FiTrash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {categories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No categories yet. Create your first category!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
