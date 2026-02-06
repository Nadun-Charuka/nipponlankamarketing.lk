'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiSearch } from 'react-icons/fi';
import { supabase } from '@/shared/lib/supabase';
import Image from 'next/image';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search to avoid too many requests
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 1) {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, slug, cash_price, featured_image, category_id')
                    .or(`name.ilike.%${searchQuery}%,category_id.ilike.%${searchQuery}%`)
                    .limit(5);

                if (!error && data) {
                    setSearchResults(data.map(p => {
                        // SANITIZE: Check if image is a known invalid path or null
                        let validImage = p.featured_image;
                        if (validImage && (!validImage.startsWith('http') && !validImage.startsWith('https'))) {
                            validImage = null; // Force fallback logic
                        }

                        return {
                            id: p.id,
                            name: p.name,
                            price: p.cash_price,
                            image: validImage,
                            slug: p.slug
                        };
                    }));
                } else {
                    setSearchResults([]);
                }
                setIsLoading(false);
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);


    // Clear search when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
            setSearchResults([]);
        }
    }, [isOpen]);

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal Panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 pt-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Header */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <FiSearch className="w-6 h-6 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search for products (e.g. 'Sony', 'Fridge')..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 text-lg outline-none placeholder:text-gray-400"
                                            autoFocus
                                        />
                                        <button
                                            onClick={onClose}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                            aria-label="Close search"
                                        >
                                            <FiX className="w-6 h-6 text-gray-700" />
                                        </button>
                                    </div>
                                </div>

                                {/* Search Results */}
                                <div className="max-h-96 overflow-y-auto">
                                    {searchQuery.length === 0 && (
                                        <div className="p-8 text-center">
                                            <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">Start typing to search for products</p>

                                            {/* Popular Searches */}
                                            <div className="mt-6 text-left">
                                                <p className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Samsung', 'LG Refrigerator', 'Washing Machine', 'Inverter AC'].map((term) => (
                                                        <button
                                                            key={term}
                                                            onClick={() => setSearchQuery(term)}
                                                            className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-full text-sm transition-colors"
                                                        >
                                                            {term}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isLoading && (
                                        <div className="p-8 text-center text-gray-500">
                                            Searching...
                                        </div>
                                    )}

                                    {!isLoading && searchQuery.length > 0 && searchResults.length === 0 && (
                                        <div className="p-8 text-center">
                                            <p className="text-gray-500">No results found for "{searchQuery}"</p>
                                        </div>
                                    )}

                                    {!isLoading && searchResults.length > 0 && (
                                        <div className="p-4 space-y-2">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.slug || product.id}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                                >
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                                                        {product.image ? (
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="64px"
                                                            />
                                                        ) : (
                                                            <div className="text-2xl">📦</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-sm text-primary-600 font-bold">
                                                                Rs. {product.price?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-400 group-hover:translate-x-1 transition-transform">
                                                        →
                                                    </div>
                                                </Link>
                                            ))}

                                            <Link
                                                href={`/products?search=${encodeURIComponent(searchQuery)}`}
                                                onClick={onClose}
                                                className="block p-4 mt-2 text-center text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-xl font-semibold transition-colors"
                                            >
                                                View all results for "{searchQuery}"
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
