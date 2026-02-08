'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import { CompanyStory } from '@/shared/types/database';

const categoryLabels = {
    charity: 'Charity',
    delivery: 'Delivery',
    team: 'Our Team',
    community: 'Community',
    event: 'Events'
};

const categoryColors = {
    charity: 'bg-pink-100 text-pink-700',
    delivery: 'bg-blue-100 text-blue-700',
    team: 'bg-green-100 text-green-700',
    community: 'bg-orange-100 text-orange-700',
    event: 'bg-red-100 text-red-700'
};

export default function StoriesAdminPage() {
    const router = useRouter();
    const [stories, setStories] = useState<CompanyStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, []);

    async function fetchStories() {
        try {
            const { data, error } = await supabase
                .from('company_stories')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching stories:', error);
            toast.error('Failed to load stories');
        } finally {
            setLoading(false);
        }
    }

    async function toggleFeatured(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('company_stories')
                .update({ is_featured: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setStories(stories.map(story =>
                story.id === id ? { ...story, is_featured: !currentStatus } : story
            ));

            toast.success(`Story ${!currentStatus ? 'featured' : 'unfeatured'}`);
        } catch (error) {
            console.error('Error toggling featured:', error);
            toast.error('Failed to update story');
        }
    }

    async function deleteStory(id: string) {
        if (!confirm('Are you sure you want to delete this story?')) return;

        try {
            const { error } = await supabase
                .from('company_stories')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setStories(stories.filter(story => story.id !== id));
            toast.success('Story deleted successfully');
        } catch (error) {
            console.error('Error deleting story:', error);
            toast.error('Failed to delete story');
        }
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Company Stories</h1>
                    <p className="text-gray-600 mt-1">Manage your company stories and impact highlights</p>
                </div>
                <Link
                    href="/admin/stories/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Add New Story
                </Link>
            </div>

            {/* Stories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Featured
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stories.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiPlus className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No stories yet</h3>
                                        <p className="text-gray-500 mb-4">Create your first story to showcase your company's impact</p>
                                        <Link
                                            href="/admin/stories/new"
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                        >
                                            <FiPlus className="w-4 h-4" />
                                            Create Story
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            stories.map((story) => (
                                <tr key={story.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                            <img
                                                src={story.image_url}
                                                alt={story.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3E📷%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {story.display_order}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{story.title}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{story.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[story.category]}`}>
                                            {categoryLabels[story.category]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleFeatured(story.id, story.is_featured)}
                                            className={`p-2 rounded-lg transition-colors ${story.is_featured
                                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                }`}
                                        >
                                            {story.is_featured ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(story.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/stories/${story.id}`}
                                                className="text-primary-600 hover:text-primary-900 p-2 hover:bg-primary-50 rounded-lg transition-colors"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => deleteStory(story.id)}
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
