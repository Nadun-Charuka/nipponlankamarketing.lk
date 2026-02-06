'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiSearch } from 'react-icons/fi';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // Mock search - will be replaced with real search later
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        // Simulate search results
        if (query.length > 2) {
            setSearchResults([
                {
                    id: '1',
                    name: 'Samsung 55" 4K Smart TV',
                    price: 250000,
                    image: '/products/samsung-tv.jpg',
                },
                {
                    id: '2',
                    name: 'LG 420L Refrigerator',
                    price: 180000,
                    image: '/products/lg-fridge.jpg',
                },
            ]);
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
                                            placeholder="Search for products..."
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
                                                    {['Samsung TV', 'LG Refrigerator', 'Washing Machine', 'Air Conditioner'].map((term) => (
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
                                                    href={`/products/${product.id}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                                >
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                                                        <p className="text-sm text-primary-600 font-semibold">
                                                            Rs. {product.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}

                                            <Link
                                                href={`/search?q=${searchQuery}`}
                                                onClick={onClose}
                                                className="block p-3 text-center text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
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
