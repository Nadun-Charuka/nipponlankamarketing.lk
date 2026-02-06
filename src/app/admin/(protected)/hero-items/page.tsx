'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import toast from 'react-hot-toast';
import { LogoLoader } from '@/shared/components/LogoLoader';

interface Product {
    id: string;
    name: string;
    slug: string;
    base_price: number;
    featured_image: string | null;
    hero_order: number;
}

export default function HeroItemsPage() {
    const [heroItems, setHeroItems] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [reorderingId, setReorderingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const MAX_HERO_ITEMS = 6;

    useEffect(() => {
        fetchHeroItems();
        fetchAvailableProducts();
    }, []);

    const fetchHeroItems = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('id, name, slug, base_price, featured_image, hero_order')
            .eq('is_hero', true)
            .order('hero_order', { ascending: true });

        if (error) {
            toast.error('Failed to load hero items');
            console.error(error);
        } else {
            setHeroItems(data || []);
        }
        setIsLoading(false);
    };

    const fetchAvailableProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('id, name, slug, base_price, featured_image, hero_order')
            .eq('is_hero', false)
            .eq('is_active', true)
            .order('name');

        if (error) {
            console.error('Error fetching available products:', error);
        } else {
            setAvailableProducts(data || []);
        }
    };

    const handleAddHeroItem = async () => {
        if (!selectedProductId) {
            toast.error('Please select a product');
            return;
        }

        if (heroItems.length >= MAX_HERO_ITEMS) {
            toast.error(`Maximum ${MAX_HERO_ITEMS} hero items allowed`);
            return;
        }

        const newOrder = heroItems.length + 1;

        const { error } = await supabase
            .from('products')
            .update({ is_hero: true, hero_order: newOrder })
            .eq('id', selectedProductId);

        if (error) {
            toast.error('Failed to add hero item');
            console.error(error);
        } else {
            toast.success('Hero item added successfully');
            setSelectedProductId('');
            fetchHeroItems();
            fetchAvailableProducts();
        }
    };

    const handleRemove = async (id: string, name: string) => {
        if (!confirm(`Remove "${name}" from hero items?`)) {
            return;
        }

        setDeletingId(id);

        const { error } = await supabase
            .from('products')
            .update({ is_hero: false, hero_order: 0 })
            .eq('id', id);

        if (error) {
            toast.error('Failed to remove hero item');
            console.error(error);
        } else {
            toast.success('Hero item removed successfully');
            // Reorder remaining items
            await reorderAfterRemoval();
        }

        setDeletingId(null);
    };

    const reorderAfterRemoval = async () => {
        await fetchHeroItems();
        const { data } = await supabase
            .from('products')
            .select('id')
            .eq('is_hero', true)
            .order('hero_order', { ascending: true });

        if (data) {
            for (let i = 0; i < data.length; i++) {
                await supabase
                    .from('products')
                    .update({ hero_order: i + 1 })
                    .eq('id', data[i].id);
            }
            fetchHeroItems();
        }
    };

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        const currentIndex = heroItems.findIndex(item => item.id === id);
        if (currentIndex === -1) return;

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (newIndex < 0 || newIndex >= heroItems.length) return;

        setReorderingId(id);

        // Optimistic UI update
        const newItems = [...heroItems];
        [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];
        setHeroItems(newItems);

        // Update database
        try {
            for (let i = 0; i < newItems.length; i++) {
                await supabase
                    .from('products')
                    .update({ hero_order: i + 1 })
                    .eq('id', newItems[i].id);
            }
            toast.success('Order updated');
        } catch (error) {
            toast.error('Failed to update order');
            fetchHeroItems(); // Revert on error
        } finally {
            setReorderingId(null);
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
                    <h1 className="text-3xl font-bold text-gray-900">Hero Items</h1>
                    <p className="text-gray-600 mt-1">
                        Manage products displayed in the hero slider ({heroItems.length}/{MAX_HERO_ITEMS})
                    </p>
                </div>
            </div>

            {/* Add Hero Item Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Hero Item</h2>
                <div className="flex gap-3">
                    <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        disabled={heroItems.length >= MAX_HERO_ITEMS}
                    >
                        <option value="">Select a product...</option>
                        {availableProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} - Rs. {product.base_price.toLocaleString()}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddHeroItem}
                        disabled={!selectedProductId || heroItems.length >= MAX_HERO_ITEMS}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiPlus className="w-5 h-5" />
                        Add to Hero
                    </button>
                </div>
                {heroItems.length >= MAX_HERO_ITEMS && (
                    <p className="text-sm text-amber-600 mt-2">
                        Maximum {MAX_HERO_ITEMS} hero items reached. Remove an item to add another.
                    </p>
                )}
            </div>

            {/* Hero Items List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {heroItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hero items yet. Add your first hero item above!</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {heroItems.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                {item.hero_order}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleReorder(item.id, 'up')}
                                                    disabled={index === 0 || reorderingId !== null}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                >
                                                    {reorderingId === item.id ? (
                                                        <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <FiArrowUp className="w-3 h-3" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleReorder(item.id, 'down')}
                                                    disabled={index === heroItems.length - 1 || reorderingId !== null}
                                                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                >
                                                    {reorderingId === item.id ? (
                                                        <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <FiArrowDown className="w-3 h-3" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                📦
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            Rs. {item.base_price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleRemove(item.id, item.name)}
                                            disabled={deletingId === item.id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {deletingId === item.id ? (
                                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <FiTrash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
