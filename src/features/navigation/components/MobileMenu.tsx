'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface MenuItem {
    id: string;
    label: string;
    href: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: MenuItem[];
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50 lg:hidden">
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
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                {/* Slide-in Panel */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="ease-in duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <Dialog.Title className="text-lg font-semibold text-gray-900">
                                    Menu
                                </Dialog.Title>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Close menu"
                                >
                                    <FiX className="w-6 h-6 text-gray-700" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex-1 overflow-y-auto">
                                <nav className="p-4 space-y-2">
                                    {/* Home Link */}
                                    <Link
                                        href="/"
                                        onClick={onClose}
                                        className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                                    >
                                        Home
                                    </Link>

                                    {/* Category Links */}
                                    {menuItems.map((item) => (
                                        <div key={item.id}>
                                            <button
                                                onClick={() => toggleCategory(item.id)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                                            >
                                                <span>{item.label}</span>
                                                {expandedCategory === item.id ? (
                                                    <FiChevronDown className="w-5 h-5" />
                                                ) : (
                                                    <FiChevronRight className="w-5 h-5" />
                                                )}
                                            </button>

                                            {/* Subcategories */}
                                            {expandedCategory === item.id && (
                                                <div className="ml-4 mt-2 space-y-1">
                                                    <Link
                                                        href={item.href}
                                                        onClick={onClose}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                    >
                                                        View All {item.label}
                                                    </Link>
                                                    {/* Add more subcategories here */}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Additional Links */}
                                    <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                                        <Link
                                            href="/about"
                                            onClick={onClose}
                                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                                        >
                                            About Us
                                        </Link>
                                        <Link
                                            href="/contact"
                                            onClick={onClose}
                                            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors"
                                        >
                                            Contact
                                        </Link>
                                    </div>
                                </nav>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p className="font-semibold">Need Help?</p>
                                    <a href="tel:+94771234567" className="block text-primary-600 hover:text-primary-700">
                                        +94 77 123 4567
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
