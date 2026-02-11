'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, FileText, Truck } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Select Your Products',
        description: 'Browse our wide range of electronics and furniture. Add your desired items to the cart or wishlist.',
        icon: ShoppingCart,
    },
    {
        id: 2,
        title: 'WhatsApp Consultation',
        description: 'Chat with our team directly. We will confirm stock, discuss pricing, and answer any questions.',
        icon: MessageCircle,
    },
    {
        id: 3,
        title: 'Document Submission',
        description: 'For installment plans, simple documentation is required. Send them easily via WhatsApp or Email.',
        icon: FileText,
    },
    {
        id: 4,
        title: 'Delivery & Enjoy',
        description: 'Once approved, we arrange swift delivery to your doorstep. Setup and installation included!',
        icon: Truck,
    },
];

export function OrderingGuide() {
    return (
        <section id="how-to-order" className="py-24 bg-gradient-to-b from-gray-50 to-purple-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                            How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Order</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Our ordering process is designed to be simple, transparent, and hassle-free.
                            We guide you every step of the way.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -translate-y-1/2 z-0 rounded-full opacity-50" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-purple-100 relative hover:shadow-2xl hover:bg-white transition-all duration-300 h-full flex flex-col items-center text-center">

                                    {/* Icon Container */}
                                    <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="w-10 h-10" />
                                    </div>

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border-2 border-purple-100 text-purple-600 flex items-center justify-center font-bold shadow-sm z-20">
                                        {step.id}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
