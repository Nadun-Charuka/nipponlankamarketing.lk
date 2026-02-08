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
            <Dialog onClose={onClose} className="relative z-[100]">
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
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal Panel Container */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-8"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-8"
                        >
                            <Dialog.Panel className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                                {/* Image Side (Left) - 50% width */}
                                <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 min-h-[300px] md:min-h-0">
                                    <div className="relative aspect-square w-full max-w-sm flex items-center justify-center mix-blend-multiply">
                                        <div className="text-center text-gray-300">
                                            <div className="text-8xl mb-4">📦</div>
                                            <p className="text-sm font-medium tracking-wide">Product Preview</p>
                                        </div>
                                    </div>
                                    {/* Badges Overlay */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                                        {product.stock_status === 'out_of_stock' && (
                                            <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                Sold Out
                                            </span>
                                        )}
                                        {product.is_featured && (
                                            <span className="bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                Hot
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Details Side (Right) - 50% width */}
                                <div className="w-full md:w-1/2 flex flex-col h-full bg-white md:max-h-[90vh]">
                                    {/* Header - Fixed */}
                                    <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100 flex-shrink-0">
                                        <div className="flex-1 pr-4">
                                            {product.brand && (
                                                <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-1">
                                                    {product.brand}
                                                </p>
                                            )}
                                            <Dialog.Title className="text-2xl font-display font-bold text-gray-900 leading-tight">
                                                {product.name}
                                            </Dialog.Title>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="p-2 -mt-2 -mr-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                                        >
                                            <FiX className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                                        {/* Rating & Stock */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center text-accent-gold text-sm">
                                                <span className="font-bold mr-1">4.8</span>
                                                {'★★★★★'}
                                                <span className="text-gray-400 ml-1">(24)</span>
                                            </div>
                                            <div className="h-4 w-px bg-gray-200" />
                                            <span className={`text-sm font-medium ${product.stock_status === 'in_stock' ? 'text-green-600' : 'text-red-500'}`}>
                                                {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>

                                        {/* Pricing */}
                                        <div className="mb-6">
                                            <DualPriceDisplay basePrice={product.base_price} variant="detail" className="bg-gray-50/50 p-4 rounded-xl border border-gray-100" />
                                        </div>

                                        {/* Description - Full text, scrollable */}
                                        {product.description && (
                                            <div className="mb-6">
                                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Key Specs - All specs, scrollable */}
                                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Specifications</h4>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {Object.entries(product.specifications).map(([key, value]) => (
                                                        <div key={key} className="flex justify-between items-start gap-4 text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                                            <span className="text-gray-500 font-medium">{key}</span>
                                                            <span className="font-semibold text-gray-900 text-right">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Actions - Fixed */}
                                    <div className="p-6 pt-4 border-t border-gray-100 bg-white flex-shrink-0">
                                        <div className="flex gap-3">
                                            <a
                                                href={`/products/${product.slug}`}
                                                className="flex-1 bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors text-center text-sm shadow-lg hover:shadow-gray-900/20"
                                            >
                                                View Full Details
                                            </a>
                                            <WhatsAppCTA
                                                productName={product.name}
                                                productUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                                                variant="icon"
                                            />
                                        </div>
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
