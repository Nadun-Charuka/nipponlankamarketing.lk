'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/shared/types/database';
import { supabase } from '@/shared/lib/supabase';
import toast from 'react-hot-toast';
import { FiSave, FiX, FiUploadCloud, FiPlus, FiTrash2 } from 'react-icons/fi';
import { LogoLoader } from '@/shared/components/LogoLoader';
import { NewCategoryModal } from './NewCategoryModal';

interface ProductFormProps {
    initialData?: Product;
    isEditing?: boolean;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [discountPercent, setDiscountPercent] = useState(20);

    // Specifications state
    const [specifications, setSpecifications] = useState<Record<string, string>>({});

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        slug: '',
        category_id: '',
        brand: '',
        base_price: undefined,
        cash_price: undefined,
        stock_status: 'in_stock',
        sku: '',
        description: '',
        specifications: {},
        is_featured: false,
        is_new: false,
        featured_order: 0,
        new_arrival_order: 0,
        ...initialData
    });

    // Load categories from database
    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name, slug')
                .order('name');

            if (error) {
                console.error('Error fetching categories:', error);
                // Fallback to hardcoded categories
                setCategories([
                    { id: 'televisions', name: 'Televisions', slug: 'televisions' },
                    { id: 'refrigerators', name: 'Refrigerators', slug: 'refrigerators' },
                    { id: 'washing-machines', name: 'Washing Machines', slug: 'washing-machines' },
                    { id: 'air-conditioners', name: 'Air Conditioners', slug: 'air-conditioners' },
                    { id: 'kitchen', name: 'Kitchen Appliances', slug: 'kitchen' },
                    { id: 'furniture', name: 'Furniture', slug: 'furniture' },
                ]);
            } else {
                setCategories(data || []);
            }
        }

        fetchCategories();
    }, []);

    // Load initial data
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            if (initialData.specifications && typeof initialData.specifications === 'object') {
                setSpecifications(initialData.specifications as Record<string, string>);
            }
            // Calculate discount percent from existing prices
            if (initialData.base_price && initialData.cash_price) {
                const discount = ((initialData.base_price - initialData.cash_price) / initialData.base_price) * 100;
                setDiscountPercent(Math.round(discount));
            }
        }
    }, [initialData]);

    // Auto-calculate cash price when base price or discount changes
    useEffect(() => {
        if (formData.base_price && formData.base_price > 0) {
            const cashPrice = formData.base_price * (1 - discountPercent / 100);
            setFormData(prev => ({ ...prev, cash_price: Math.round(cashPrice) }));
        }
    }, [formData.base_price, discountPercent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Auto-generate slug if missing
            const slug = formData.slug || formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';

            const payload = {
                ...formData,
                slug,
                specifications: specifications,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Handle category selection
        if (name === 'category_id' && value === '__new__') {
            setShowNewCategoryModal(true);
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleCategoryCreated = (categoryId: string, categoryName: string) => {
        // Add new category to list
        setCategories(prev => [...prev, { id: categoryId, name: categoryName, slug: categoryId }]);
        // Select the new category
        setFormData(prev => ({ ...prev, category_id: categoryId }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        await uploadImages(files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await uploadImages(files);
        }
    };

    const uploadImages = async (filesToUpload: FileList) => {
        setIsUploading(true);
        const filesArray = Array.from(filesToUpload);
        const uploadedUrls: string[] = [];

        try {
            for (const file of filesArray) {
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

    // Specification handlers with stable IDs
    const [specIdCounter, setSpecIdCounter] = useState(0);

    const addSpecification = () => {
        const id = `spec_${specIdCounter}`;
        setSpecIdCounter(prev => prev + 1);
        setSpecifications(prev => ({ ...prev, [id]: '' }));
    };

    const updateSpecificationKey = (id: string, newKey: string) => {
        setSpecifications(prev => {
            const newSpecs: Record<string, string> = {};
            Object.entries(prev).forEach(([k, v]) => {
                if (k === id) {
                    newSpecs[newKey || id] = v;
                } else {
                    newSpecs[k] = v;
                }
            });
            return newSpecs;
        });
    };

    const updateSpecificationValue = (key: string, value: string) => {
        setSpecifications(prev => ({ ...prev, [key]: value }));
    };

    const removeSpecification = (key: string) => {
        setSpecifications(prev => {
            const { [key]: _, ...rest } = prev;
            return rest;
        });
    };

    return (
        <>
            <NewCategoryModal
                show={showNewCategoryModal}
                onClose={() => setShowNewCategoryModal(false)}
                onCategoryCreated={handleCategoryCreated}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <div className="px-4 py-6 sm:p-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">Basic Information</h3>
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name *
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Samsung 55 inch 4K Smart TV"
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
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
                                        placeholder="e.g., TV-SAM-55-001"
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        value={formData.brand || ''}
                                        onChange={handleChange}
                                        placeholder="e.g., Samsung, LG, Sony"
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category_id" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category *
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={formData.category_id || ''}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                        <option value="__new__" className="font-semibold text-primary-600">+ Create New Category</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="stock_status" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock Status *
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="stock_status"
                                        name="stock_status"
                                        value={formData.stock_status || 'in_stock'}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    >
                                        <option value="in_stock">In Stock</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                        <option value="pre_order">Pre Order</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <div className="px-4 py-6 sm:p-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">Product Details</h3>
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6">
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description *
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        required
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        maxLength={1000}
                                        placeholder="Describe the product features, benefits, and what makes it special..."
                                        className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {formData.description?.length || 0} / 1000 characters
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Specifications
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                        Add Specification
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {Object.entries(specifications).map(([key, value], index) => {
                                        const displayKey = key.startsWith('spec_') ? '' : key;
                                        const specId = key.startsWith('spec_') ? key : `spec_${index}`;

                                        return (
                                            <div key={specId} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={displayKey}
                                                    onChange={(e) => updateSpecificationKey(key, e.target.value)}
                                                    placeholder="e.g., Screen Size"
                                                    className="block w-1/3 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => updateSpecificationValue(key, e.target.value)}
                                                    placeholder="e.g., 55 inches"
                                                    className="block flex-1 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpecification(key)}
                                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                    {Object.keys(specifications).length === 0 && (
                                        <p className="text-sm text-gray-500 italic">No specifications added yet. Click "Add Specification" to start.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <div className="px-4 py-6 sm:p-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">Pricing</h3>
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="base_price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Base Price (LKR) *
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="base_price"
                                        id="base_price"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.base_price || ''}
                                        onChange={handleChange}
                                        placeholder="e.g., 150000"
                                        className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Regular selling price</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="discount_percent" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cash Discount (%)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        id="discount_percent"
                                        min="0"
                                        max="100"
                                        value={discountPercent}
                                        onChange={(e) => setDiscountPercent(Number(e.target.value))}
                                        className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Discount for cash payments</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="cash_price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cash Price (LKR) *
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="cash_price"
                                        id="cash_price"
                                        required
                                        value={formData.cash_price || ''}
                                        readOnly
                                        className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm leading-6"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-green-600 font-medium">
                                    Auto-calculated: {discountPercent}% off
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display Settings Section */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <div className="px-4 py-6 sm:p-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">Display Settings</h3>
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                            {/* Featured Checkbox */}
                            <div className="sm:col-span-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="is_featured"
                                            name="is_featured"
                                            type="checkbox"
                                            checked={formData.is_featured || false}
                                            onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="is_featured" className="font-medium text-gray-900 cursor-pointer">
                                            ⭐ Featured Product
                                        </label>
                                        <p className="text-gray-500">Show in Featured Products section</p>
                                    </div>
                                </div>
                            </div>

                            {/* New Arrival Checkbox */}
                            <div className="sm:col-span-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="is_new"
                                            name="is_new"
                                            type="checkbox"
                                            checked={formData.is_new || false}
                                            onChange={(e) => setFormData(prev => ({ ...prev, is_new: e.target.checked }))}
                                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="is_new" className="font-medium text-gray-900 cursor-pointer">
                                            🚀 New Arrival
                                        </label>
                                        <p className="text-gray-500">Show in New Arrivals section</p>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Order */}
                            {formData.is_featured && (
                                <div className="sm:col-span-3">
                                    <label htmlFor="featured_order" className="block text-sm font-medium leading-6 text-gray-900">
                                        Featured Display Order
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="featured_order"
                                            id="featured_order"
                                            min="0"
                                            max="999"
                                            value={formData.featured_order || 0}
                                            onChange={(e) => setFormData(prev => ({ ...prev, featured_order: parseInt(e.target.value) || 0 }))}
                                            className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Lower numbers appear first (0 = first)</p>
                                </div>
                            )}

                            {/* New Arrival Order */}
                            {formData.is_new && (
                                <div className="sm:col-span-3">
                                    <label htmlFor="new_arrival_order" className="block text-sm font-medium leading-6 text-gray-900">
                                        New Arrival Display Order
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="new_arrival_order"
                                            id="new_arrival_order"
                                            min="0"
                                            max="999"
                                            value={formData.new_arrival_order || 0}
                                            onChange={(e) => setFormData(prev => ({ ...prev, new_arrival_order: parseInt(e.target.value) || 0 }))}
                                            className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm leading-6"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Lower numbers appear first (0 = first)</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Images Section */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <div className="px-4 py-6 sm:p-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-6">Product Images</h3>

                        {/* Upload Area */}
                        <div
                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
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
                                                <span>Upload files</span>
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

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => router.back()} className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            'Saving...'
                        ) : (
                            <>
                                <FiSave className="w-4 h-4" />
                                {isEditing ? 'Update Product' : 'Create Product'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
