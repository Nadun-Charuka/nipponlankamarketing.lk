'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export function CartDrawer() {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart
    } = useCart();

    const handleCheckout = () => {
        // Generate WhatsApp Message
        const phoneNumber = "94771234567"; // Replace with actual number

        let message = "Hi, I'd like to place an order:%0a%0a";

        cartItems.forEach((item, index) => {
            const price = item.product.cash_price || item.product.base_price || 0;
            message += `${index + 1}. ${item.product.name} (x${item.quantity}) - Rs. ${(price * item.quantity).toLocaleString()}%0a`;
        });

        message += `%0a*Total: Rs. ${cartTotal.toLocaleString()}*`;
        message += "%0a%0a[Sent from Website Cart]";

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <Transition.Root show={isCartOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setIsCartOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping Cart
                                                    <span className="ml-2 text-sm text-gray-500 font-normal">
                                                        ({cartItems.length} items)
                                                    </span>
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setIsCartOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <FiX className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {cartItems.length === 0 ? (
                                                        <div className="text-center py-12">
                                                            <div className="text-6xl mb-4">🛒</div>
                                                            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                                                            <p className="mt-1 text-gray-500">Start adding some awesome products!</p>
                                                            <div className="mt-6">
                                                                <button
                                                                    onClick={() => setIsCartOpen(false)}
                                                                    className="text-primary-600 font-medium hover:text-primary-500"
                                                                >
                                                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {cartItems.map((item) => (
                                                                <li key={item.product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        {item.product.featured_image ? (
                                                                            <Image
                                                                                src={item.product.featured_image}
                                                                                alt={item.product.name}
                                                                                width={96}
                                                                                height={96}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        ) : (
                                                                            <div className="h-full w-full bg-gray-100 flex items-center justify-center text-2xl">📦</div>
                                                                        )}
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <Link href={`/products/${item.product.slug}`} onClick={() => setIsCartOpen(false)}>
                                                                                        {item.product.name}
                                                                                    </Link>
                                                                                </h3>
                                                                                <p className="ml-4">
                                                                                    Rs. {((item.product.cash_price || item.product.base_price || 0) * item.quantity).toLocaleString()}
                                                                                </p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            {/* Quantity Controls */}
                                                                            <div className="flex items-center border border-gray-300 rounded-lg h-8">
                                                                                <button
                                                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                                    className="px-2 h-full hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors"
                                                                                    disabled={item.quantity <= 1}
                                                                                >
                                                                                    <FiMinus className="w-3 h-3" />
                                                                                </button>
                                                                                <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                                                                                <button
                                                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                                    className="px-2 h-full hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
                                                                                >
                                                                                    <FiPlus className="w-3 h-3" />
                                                                                </button>
                                                                            </div>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeFromCart(item.product.id)}
                                                                                    className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                                                                                >
                                                                                    <FiTrash2 className="w-4 h-4" />
                                                                                    <span className="hidden sm:inline">Remove</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {cartItems.length > 0 && (
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>Rs. {cartTotal.toLocaleString()}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <button
                                                        onClick={handleCheckout}
                                                        className="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-[#25D366] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#20bd5a] transition-all hover:shadow-lg active:scale-[0.99]"
                                                    >
                                                        <FaWhatsapp className="w-5 h-5" />
                                                        Checkout via WhatsApp
                                                    </button>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-primary-600 hover:text-primary-500"
                                                            onClick={() => setIsCartOpen(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
