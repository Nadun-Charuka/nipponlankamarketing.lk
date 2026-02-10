'use client';

import { motion } from 'framer-motion';
import { Store, Users } from 'lucide-react';

export function BusinessServices() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">Business Solutions</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">
                        Growing Together / අප සමග දියුණු වන්න
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        We support small businesses and communities with tailored purchasing plans.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Wholesale Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-900 to-purple-800 text-white p-8 md:p-12 shadow-2xl"
                    >
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                <Store className="w-8 h-8 text-purple-200" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Wholesale for Retailers</h3>
                            <p className="text-purple-100 leading-relaxed mb-8">
                                Are you a small retail business owner? We offer exclusive wholesale prices for bulk purchases.
                                Stock your shop with high-quality electronics and appliances directly from us.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Competitive wholesale rates
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Priority delivery service
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    Marketing support included
                                </li>
                            </ul>

                            <button className="px-8 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/50">
                                Register as Partner
                            </button>
                        </div>
                    </motion.div>

                    {/* Group Purchasing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-600 to-purple-600 text-white p-8 md:p-12 shadow-2xl"
                    >
                        {/* Background Pattern */}
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                                <Users className="w-8 h-8 text-pink-200" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Group Purchasing (Seettu)</h3>
                            <p className="text-pink-100 leading-relaxed mb-8">
                                Join our trusted "Seettu" schemes to purchase high-value items through affordable monthly contributions.
                                Ideal for communities and office groups.
                                <br />
                                <span className="font-sinhala text-sm mt-2 block opacity-90">(විශ්වාසවන්ත සීට්ටු ක්‍රමය මගින් භාණ්ඩ මිලදී ගන්න)</span>
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                                    No interest or hidden fees
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                                    Guaranteed delivery upon turn
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                                    Government registered scheme
                                </li>
                            </ul>

                            <button className="px-8 py-3 bg-white text-pink-700 font-bold rounded-xl hover:bg-pink-50 transition-colors shadow-lg shadow-pink-900/50">
                                Join a Group
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
