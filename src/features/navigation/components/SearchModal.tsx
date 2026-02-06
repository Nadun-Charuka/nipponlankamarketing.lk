'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiSearch } from 'react-icons/fi';
import { allProducts } from '@/shared/data/products';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query.length > 1) {
            const lowerQuery = query.toLowerCase();
            const results = allProducts.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                (p.category_id && p.category_id.toLowerCase().includes(lowerQuery))
            ).slice(0, 5); // Limit to 5 results for preview

            setSearchResults(results.map(p => ({
                id: p.id,
                name: p.name,
                price: p.cash_price, // Use cash price for display
                image: p.featured_image,
                slug: p.slug
            })));
        } else {
            setSearchResults([]);
        }
    };

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
                                            onChange={(e) => handleSearch(e.target.value)}
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
                                                            onClick={() => handleSearch(term)}
                                                            className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-full text-sm transition-colors"
                                                        >
                                                            {term}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {searchQuery.length > 0 && searchResults.length === 0 && (
                                        <div className="p-8 text-center">
                                            <p className="text-gray-500">No results found for "{searchQuery}"</p>
                                        </div>
                                    )}

                                    {searchResults.length > 0 && (
                                        <div className="p-4 space-y-2">
                                            {searchResults.map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.slug || product.id}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                                                >
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                                                        {/* Placeholder image logic since we're using strings */}
                                                        {/* <Image src={product.image} fill className="object-contain" /> */}
                                                        <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-sm text-primary-600 font-bold">
                                                                Rs. {product.price.toLocaleString()}
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
