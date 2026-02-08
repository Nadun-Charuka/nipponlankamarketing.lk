'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiSave, FiX, FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import { CompanyStory } from '@/shared/types/database';
import { LogoLoader } from '@/shared/components/LogoLoader';

interface StoryFormProps {
    storyId?: string;
}

const categoryOptions = [
    { value: 'charity', label: 'Charity' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'team', label: 'Our Team' },
    { value: 'community', label: 'Community' },
    { value: 'event', label: 'Events' }
];

export default function StoryForm({ storyId }: StoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        category: 'charity' as CompanyStory['category'],
        is_featured: true,
        display_order: 0
    });

    useEffect(() => {
        if (storyId) {
            fetchStory();
        }
    }, [storyId]);

    async function fetchStory() {
        try {
            const { data, error } = await supabase
                .from('company_stories')
                .select('*')
                .eq('id', storyId)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title,
                    description: data.description,
                    image_url: data.image_url,
                    category: data.category,
                    is_featured: data.is_featured,
                    display_order: data.display_order
                });
            }
        } catch (error) {
            console.error('Error fetching story:', error);
            toast.error('Failed to load story');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.image_url) {
            toast.error('Please upload an image');
            return;
        }

        setLoading(true);

        try {
            if (storyId) {
                // Update existing story
                const { error } = await supabase
                    .from('company_stories')
                    .update({
                        ...formData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', storyId);

                if (error) throw error;
                toast.success('Story updated successfully');
            } else {
                // Create new story
                const { error } = await supabase
                    .from('company_stories')
                    .insert([formData]);

                if (error) throw error;
                toast.success('Story created successfully');
            }

            router.push('/admin/stories');
        } catch (error) {
            console.error('Error saving story:', error);
            toast.error('Failed to save story');
        } finally {
            setLoading(false);
        }
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        await uploadImage(files[0]);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await uploadImage(files[0]);
        }
    }

    async function uploadImage(file: File) {
        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('stories')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('stories')
                .getPublicUrl(filePath);

            setFormData(prev => ({
                ...prev,
                image_url: publicUrl
            }));

            toast.success('Image uploaded successfully!');
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image. Ensure bucket "stories" exists and is public.');
        } finally {
            setIsUploading(false);
        }
    }

    function handleRemoveImage() {
        setFormData(prev => ({ ...prev, image_url: '' }));
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {storyId ? 'Edit Story' : 'Create New Story'}
                </h1>
                <p className="text-gray-600 mt-1">
                    Share your company's impact and community involvement
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={200}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., Flood Relief Donation Drive"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        required
                        maxLength={500}
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe the story, impact, or event..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Story Image *
                    </label>

                    {!formData.image_url ? (
                        <div
                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="text-center w-full">
                                {isUploading ? (
                                    <div className="py-8">
                                        <LogoLoader textClassName="text-sm" />
                                        <p className="text-xs text-gray-500 mt-2">Uploading...</p>
                                    </div>
                                ) : (
                                    <>
                                        <FiUploadCloud className="mx-auto h-12 w-12 text-gray-300" />
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
                    ) : (
                        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={formData.image_url}
                                alt="Story preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-3 right-3 p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-lg"
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                    </label>
                    <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as CompanyStory['category'] })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display Order */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Order
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                        Show on homepage (Featured)
                    </label>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading || isUploading}
                        className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <FiSave className="w-5 h-5" />
                        {loading ? 'Saving...' : storyId ? 'Update Story' : 'Create Story'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/stories')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
