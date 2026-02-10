'use client';

import { motion } from 'framer-motion';
import { Users, ShieldCheck, Award, Smile } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: '12+',
        label: 'Team Members',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        icon: ShieldCheck,
        value: '100%',
        label: 'Official Warranty',
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
    {
        icon: Award,
        value: '24+',
        label: 'Years Experience',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
    {
        icon: Smile,
        value: '5000+',
        label: 'Happy Customers',
        color: 'text-pink-600',
        bg: 'bg-pink-50',
    },
];

export function CompanyStats() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center p-6 rounded-3xl hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className={`w-14 h-14 mx-auto rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
