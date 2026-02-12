'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import toast from 'react-hot-toast';

interface NewCategoryModalProps {
    show: boolean;
    onClose: () => void;
    onCategoryCreated: (categoryId: string, categoryName: string) => void;
}

export function NewCategoryModal({ show, onClose, onCategoryCreated }: NewCategoryModalProps) {
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            toast.error('Please enter a category name');
            return;
        }

        setIsLoading(true);

        try {
            // Generate slug from name
            const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            // Check if category already exists
            const { data: existing } = await supabase
                .from('categories')
                .select('id')
                .eq('slug', slug)
                .single();

            if (existing) {
                toast.error('A category with this name already exists');
                setIsLoading(false);
                return;
            }

            // Check active limit
            let isActive = true;
            const { count, error: countError } = await supabase
                .from('categories')
                .select('*', { count: 'exact', head: true })
                .eq('is_active', true);

            if (countError) throw countError;

            if (count && count >= 9) {
                toast.error('Maximum 9 categories can be active. This category will be created as Inactive.');
                isActive = false;
            }

            // Get max display_order
            const { data: maxOrderData, error: maxOrderError } = await supabase
                .from('categories')
                .select('display_order')
                .order('display_order', { ascending: false })
                .limit(1)
                .single();

            const nextOrder = (maxOrderData?.display_order || 0) + 1;

            // Create new category with UUID
            const categoryId = crypto.randomUUID();
            const { data, error } = await supabase
                .from('categories')
                .insert([{
                    id: categoryId,
                    name: categoryName,
                    slug: slug,
                    display_order: nextOrder,
                    is_active: isActive,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;

            toast.success('Category created successfully!');
            onCategoryCreated(categoryId, categoryName);
            setCategoryName('');
            onClose();
        } catch (error: any) {
            console.error('Error creating category:', error);
            toast.error(error.message || 'Failed to create category');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Create New Category
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="e.g., Laptops, Smartphones"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-4 py-3"
                            autoFocus
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            This will be used to organize products
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !categoryName.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
