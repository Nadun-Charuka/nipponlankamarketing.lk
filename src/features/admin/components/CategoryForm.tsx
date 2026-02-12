'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiX } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import { getAvailableIcons } from '@/shared/utils/iconMapper';
import toast from 'react-hot-toast';

interface CategoryFormProps {
    categoryId?: string;
}

export function CategoryForm({ categoryId }: CategoryFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        icon_name: 'MdChair',
        display_order: 0,
        is_active: true
    });

    const availableIcons = getAvailableIcons();

    useEffect(() => {
        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);

    const fetchCategory = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', categoryId)
            .single();

        if (error) {
            toast.error('Failed to load category');
            console.error(error);
        } else if (data) {
            setFormData({
                name: data.name || '',
                slug: data.slug || '',
                icon_name: data.icon_name || 'MdChair',
                display_order: data.display_order || 0,
                is_active: data.is_active ?? true
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Auto-generate slug from name
        if (name === 'name') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Check active limit if setting to active
            if (formData.is_active) {
                // If editing, exclude current category from count check (or just check count)
                // Actually, if we are editing and it was already active, count won't change.
                // If it was inactive and we make it active, count increases.
                // Simplest is to check count of OTHER active categories.

                let query = supabase
                    .from('categories')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_active', true);

                if (categoryId) {
                    query = query.neq('id', categoryId);
                }

                const { count, error: countError } = await query;

                if (countError) throw countError;

                if (count && count >= 9) {
                    toast.error('Maximum 9 categories can be active in Navbar');
                    // We don't force it to false here, we just stop the save?
                    // Or we let them save but as inactive?
                    // User said "admin can only make active...". 
                    // Better to stop save and ask user to uncheck or deactivate others first.
                    setIsLoading(false);
                    return;
                }
            }

            if (categoryId) {
                // Update existing category
                const { error } = await supabase
                    .from('categories')
                    .update(formData)
                    .eq('id', categoryId);

                if (error) throw error;
                toast.success('Category updated successfully');
            } else {
                // Create new category - generate UUID
                const { error } = await supabase
                    .from('categories')
                    .insert([{
                        ...formData,
                        id: crypto.randomUUID() // Generate UUID for new category
                    }]);

                if (error) throw error;
                toast.success('Category created successfully');
            }

            router.push('/admin/categories');
        } catch (error: any) {
            toast.error(error.message || 'Failed to save category');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">
                        Category Information
                    </h3>
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        {/* Name */}
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Category Name *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                    placeholder="e.g., Televisions"
                                />
                            </div>
                        </div>

                        {/* Slug */}
                        <div className="sm:col-span-4">
                            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                                Slug *
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                    placeholder="e.g., televisions"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Auto-generated from name, used in URLs</p>
                        </div>

                        {/* Icon Selection */}
                        <div className="sm:col-span-4">
                            <label htmlFor="icon_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Icon *
                            </label>
                            <div className="mt-2">
                                <select
                                    name="icon_name"
                                    id="icon_name"
                                    value={formData.icon_name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                >
                                    {availableIcons.map(({ name, component: Icon }) => (
                                        <option key={name} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Icon Preview */}
                            <div className="mt-3 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                                    {(() => {
                                        const selectedIcon = availableIcons.find(i => i.name === formData.icon_name);
                                        if (selectedIcon) {
                                            const Icon = selectedIcon.component;
                                            return <Icon className="w-6 h-6 text-primary-600" />;
                                        }
                                        return null;
                                    })()}
                                </div>
                                <span className="text-sm text-gray-600">Preview</span>
                            </div>
                        </div>

                        {/* Display Order */}
                        <div className="sm:col-span-2">
                            <label htmlFor="display_order" className="block text-sm font-medium leading-6 text-gray-900">
                                Display Order
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="display_order"
                                    id="display_order"
                                    value={formData.display_order}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                        </div>

                        {/* Active Status */}
                        <div className="sm:col-span-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">
                                    Active (show in navbar)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.push('/admin/categories')}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FiX className="w-4 h-4" />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiSave className="w-4 h-4" />
                    {isLoading ? 'Saving...' : categoryId ? 'Update Category' : 'Create Category'}
                </button>
            </div>
        </form>
    );
}
