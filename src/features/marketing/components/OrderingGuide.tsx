'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle, FileText, Truck } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Select Your Products',
        description: 'Browse our wide range of electronics and furniture. Add your desired items to the cart or wishlist.',
        icon: ShoppingCart,
        bgClass: 'bg-blue-500',
        textClass: 'text-blue-600',
        iconClass: 'text-blue-500',
    },
    {
        id: 2,
        title: 'WhatsApp Consultation',
        description: 'Chat with our team directly. We will confirm stock, discuss pricing, and answer any questions.',
        icon: MessageCircle,
        bgClass: 'bg-green-500',
        textClass: 'text-green-600',
        iconClass: 'text-green-500',
    },
    {
        id: 3,
        title: 'Document Submission',
        description: 'For installment plans, simple documentation is required. Send them easily via WhatsApp or Email.',
        icon: FileText,
        bgClass: 'bg-purple-500',
        textClass: 'text-purple-600',
        iconClass: 'text-purple-500',
    },
    {
        id: 4,
        title: 'Delivery & Enjoy',
        description: 'Once approved, we arrange swift delivery to your doorstep. Setup and installation included!',
        icon: Truck,
        bgClass: 'bg-pink-500',
        textClass: 'text-pink-600',
        iconClass: 'text-pink-500',
    },
];

export function OrderingGuide() {
    return (
        <section id="how-to-order" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        How to Order
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our ordering process is designed to be simple, transparent, and hassle-free.
                        From selection to delivery, we guide you every step of the way.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group hover:translate-y-[-5px] transition-transform duration-300"
                            >
                                {/* Step Number Badge */}
                                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${step.bgClass} text-white flex items-center justify-center font-bold text-xl shadow-md ring-4 ring-white`}>
                                    {step.id}
                                </div>

                                <div className="mt-8 text-center">
                                    <div className={`w-16 h-16 mx-auto rounded-2xl ${step.bgClass} bg-opacity-10 ${step.textClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <step.icon className={`w-8 h-8 ${step.iconClass}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
