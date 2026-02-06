'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { Product } from '@/shared/types/database';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { WhatsAppCTA } from '@/features/whatsapp/components/WhatsAppCTA';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    if (!product) return null;

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
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal Panel */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                                        Quick View
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        aria-label="Close"
                                    >
                                        <FiX className="w-6 h-6 text-gray-700" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="grid md:grid-cols-2 gap-8 p-6">
                                    {/* Image Side */}
                                    <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                                        <div className="text-center text-gray-400">
                                            <div className="text-6xl mb-4">📦</div>
                                            <p className="text-sm">Product Image</p>
                                        </div>
                                    </div>

                                    {/* Details Side */}
                                    <div className="space-y-6">
                                        {/* Product Name */}
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                {product.name}
                                            </h2>
                                            <p className="text-gray-600">{product.description}</p>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center text-accent-gold text-lg">
                                                {'★★★★★'.split('').map((star, i) => (
                                                    <span key={i} className={i < 4 ? '' : 'text-gray-300'}>
                                                        {star}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">(24 reviews)</span>
                                        </div>

                                        {/* Stock Status */}
                                        <div>
                                            {product.stock_status === 'in_stock' ? (
                                                <span className="inline-flex items-center gap-2 text-accent-green font-semibold">
                                                    <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 text-accent-red font-semibold">
                                                    <span className="w-2 h-2 bg-accent-red rounded-full"></span>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>

                                        {/* Pricing */}
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <DualPriceDisplay basePrice={product.base_price} variant="detail" />
                                        </div>

                                        {/* Specifications */}
                                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Key Specifications</h3>
                                                <div className="space-y-2">
                                                    {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between text-sm">
                                                            <span className="text-gray-600">{key}:</span>
                                                            <span className="font-medium text-gray-900">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* WhatsApp CTA */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <WhatsAppCTA
                                                productName={product.name}
                                                productUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                                            />
                                        </div>

                                        {/* View Full Details Link */}
                                        <a
                                            href={`/products/${product.slug}`}
                                            className="block text-center text-primary-600 hover:text-primary-700 font-semibold"
                                        >
                                            View Full Product Details →
                                        </a>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
