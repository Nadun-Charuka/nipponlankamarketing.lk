'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, FileText, CreditCard, Calendar, Truck } from 'lucide-react';

export function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup
        const hasSeenPopup = localStorage.getItem('nippon_welcome_seen');

        // Show popup if not seen yet (add a small delay for better UX)
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('nippon_welcome_seen', 'true');
    };

    const advantages = [
        {
            icon: FileText,
            title: 'Less Documents',
            subtitle: 'අඩු ලියකියවිලි',
            color: 'bg-blue-100 text-blue-600',
        },
        {
            icon: CreditCard,
            title: 'Small Downpayment',
            subtitle: 'අවම මූලික ගෙවීම',
            color: 'bg-purple-100 text-purple-600',
        },
        {
            icon: Calendar,
            title: 'Flexible Installments',
            subtitle: 'පහසු වාරික',
            color: 'bg-pink-100 text-pink-600',
        },
        {
            icon: Truck,
            title: 'Free Delivery',
            subtitle: 'බස්නාහිර පළාතට නොමිලේ',
            color: 'bg-green-100 text-green-600',
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative z-10 bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header / Banner */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                            <h2 className="text-2xl font-bold text-white mb-1 relative z-10">Welcome to Nippon Lanka!</h2>
                            <p className="text-white/90 text-sm relative z-10">Experience the difference</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4">
                            {advantages.map((adv, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100/50 hover:border-pink-100 transition-colors"
                                >
                                    <div className={`p-3 rounded-xl ${adv.color}`}>
                                        <adv.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 leading-tight">{adv.title}</h3>
                                        <p className="text-sm text-gray-500 font-medium font-sinhala">{adv.subtitle}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <CheckCircle className="w-5 h-5 text-green-500 opacity-0 animate-in fade-in zoom-in duration-500 delay-500 fill-green-50" style={{ animationFillMode: 'forwards' }} />
                                    </div>
                                </motion.div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleClose}
                                className="mt-4 w-full py-3.5 bg-gray-900 hover:bg-purple-900 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 transition-all"
                            >
                                Start Shopping
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
