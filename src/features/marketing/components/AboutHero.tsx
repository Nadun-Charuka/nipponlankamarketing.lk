'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
    return (
        <section className="relative py-20 overflow-hidden bg-purple-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-purple-900 to-pink-800" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-30" />
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-500/40 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 border border-purple-400/50 rounded-full bg-purple-500/20 backdrop-blur-sm">
                            <span className="text-purple-300 font-bold text-sm tracking-widest uppercase">Since 2000</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                            Empowering Homes <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-text-shimmer bg-[length:200%_auto]">
                                Across Sri Lanka
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Nippon Lanka Marketing Pvt Ltd has been a trusted name in electronics and home appliances for over two decades.
                            We are dedicated to bringing the latest technology and highest quality products to every Sri Lankan household,
                            backed by exceptional service and genuine care.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <p className="text-3xl font-bold text-white mb-1">24+</p>
                                <p className="text-sm text-gray-400 uppercase tracking-wider">Years of Excellence</p>
                            </div>
                            <div className="px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <p className="text-3xl font-bold text-white mb-1">12+</p>
                                <p className="text-sm text-gray-400 uppercase tracking-wider">Dedicated Staff</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <div className="h-64 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Meeting"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="h-48 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1577962917302-cd874c4e3169?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Electronics"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-48 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Team"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="h-64 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="Office"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
