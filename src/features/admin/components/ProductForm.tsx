'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';
import toast from 'react-hot-toast';
import { FiSave, FiX, FiUploadCloud } from 'react-icons/fi';
import { LogoLoader } from '@/shared/components/LogoLoader';

interface ProductFormProps {
    initialData?: Product;
    isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        slug: '',
        category_id: '',
        base_price: 0,
        cash_price: 0,
        stock_status: 'in_stock',
        sku: '',
        description: '',
        specifications: {},
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Auto-generate slug if missing
            const slug = formData.slug || formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';

            const payload = {
                ...formData,
                slug,
                updated_at: new Date().toISOString()
            };

            let error;

            if (isEditing && initialData?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                // Create
                const { error: insertError } = await supabase
                    .from('products')
                    .insert([{ ...payload, created_at: new Date().toISOString() }]);
                error = insertError;
            }

            if (error) throw error;

            toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully');
            router.push('/admin/products');
            router.refresh();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
            }

            setFormData(prev => {
                const newImages = [...(prev.images || []), ...uploadedUrls];
                return {
                    ...prev,
                    images: newImages,
                    // If no featured image, set the first one
                    featured_image: prev.featured_image || newImages[0]
                };
            });

            toast.success('Images uploaded!');
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image. Ensure bucket "products" exists and is public.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = (urlToRemove: string) => {
        setFormData(prev => {
            const newImages = (prev.images || []).filter(url => url !== urlToRemove);
            return {
                ...prev,
                images: newImages,
                featured_image: prev.featured_image === urlToRemove ? (newImages[0] || null) : prev.featured_image
            };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Basic Info */}
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">
                                SKU
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="sku"
                                    id="sku"
                                    value={formData.sku || ''}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category_id" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id || ''}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                >
                                    <option value="">Select a category</option>
                                    <option value="televisions">Televisions</option>
                                    <option value="refrigerators">Refrigerators</option>
                                    <option value="washing-machines">Washing Machines</option>
                                    <option value="air-conditioners">Air Conditioners</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="stock_status" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="stock_status"
                                    name="stock_status"
                                    value={formData.stock_status || 'in_stock'}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                >
                                    <option value="in_stock">In Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                    <option value="pre_order">Pre Order</option>
                                </select>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="sm:col-span-3">
                            <label htmlFor="base_price" className="block text-sm font-medium leading-6 text-gray-900">
                                Base Price (LKR)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="base_price"
                                    id="base_price"
                                    required
                                    min="0"
                                    value={formData.base_price}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="cash_price" className="block text-sm font-medium leading-6 text-gray-900">
                                Cash Price (LKR)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="cash_price"
                                    id="cash_price"
                                    required
                                    min="0"
                                    value={formData.cash_price}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Should be ~20% less than Base Price</p>
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Product Images
                            </label>

                            {/* Upload Area */}
                            {/* Upload Area */}
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="text-center w-full">
                                    {isUploading ? (
                                        <div className="py-8">
                                            <LogoLoader textClassName="text-sm" />
                                            <p className="text-xs text-gray-500 mt-2">Optimizing & Uploading...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        disabled={isUploading}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Image Previews */}
                            {formData.images && formData.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />

                                            {/* Delete Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(url)}
                                                    className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50"
                                                >
                                                    <FiX className="w-4 h-4" />
                                                </button>
                                                {/* Set Featured */}
                                                {formData.featured_image !== url && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, featured_image: url }))}
                                                        className="px-2 py-1 bg-white text-xs font-semibold rounded shadow hover:bg-gray-50"
                                                    >
                                                        Set Main
                                                    </button>
                                                )}
                                            </div>

                                            {/* Featured Badge */}
                                            {formData.featured_image === url && (
                                                <div className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                                                    Main
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-2"
                    >
                        {isLoading ? (
                            'Saving...'
                        ) : (
                            <>
                                <FiSave className="w-4 h-4" />
                                Save Product
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
