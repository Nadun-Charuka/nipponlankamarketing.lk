'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
    return (
        <section className="relative h-[65vh] min-h-[500px] flex items-end justify-start md:items-center md:justify-center overflow-hidden pb-24 md:pb-0">
            {/* Background Video */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent md:bg-gradient-to-r md:from-purple-900/60 md:to-pink-900/60 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    // poster="https://hhkanlbzspxxwraatkgt.supabase.co/storage/v1/object/public/about_hero/for%20about%20us%201.jpg"
                    className="w-full h-full object-cover"
                >
                    <source src="https://hhkanlbzspxxwraatkgt.supabase.co/storage/v1/object/public/about_hero/about_hero_video%20(1)%20(1).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-left md:text-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto md:mx-auto"
                >
                    <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 mb-6 md:mb-8 border border-white/20 rounded-full bg-white/10 backdrop-blur-md">
                        <span className="text-white font-medium tracking-[0.2em] uppercase text-xs md:text-sm">Since year 2000</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-lg">
                        Empowering Homes <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 animate-text-shimmer bg-[length:200%_auto]">
                            Across Sri Lanka
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-100 mb-8 md:mb-12 leading-relaxed max-w-xl md:max-w-2xl md:mx-auto drop-shadow-md">
                        Bringing the latest technology and highest quality products to every household with exceptional service and care.
                    </p>

                    <div className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-4 md:px-8 md:py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                        >
                            <p className="text-2xl md:text-4xl font-bold text-white mb-1">24+</p>
                            <p className="text-xs md:text-sm text-gray-200 uppercase tracking-wider font-medium">Years</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-4 md:px-8 md:py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                        >
                            <p className="text-2xl md:text-4xl font-bold text-white mb-1">12+</p>
                            <p className="text-xs md:text-sm text-gray-200 uppercase tracking-wider font-medium">Staff</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
