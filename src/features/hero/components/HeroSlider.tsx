'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { supabase } from '@/shared/lib/supabase';
import { LogoLoader } from '@/shared/components/LogoLoader';
import { Star, ShoppingBag, CreditCard } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroProduct {
    id: string;
    name: string;
    slug: string;
    base_price: number;
    featured_image: string | null;
    hero_order: number;
    is_featured?: boolean;
}

export function HeroSlider() {
    const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchHeroProducts();
    }, []);

    const fetchHeroProducts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('id, name, slug, base_price, featured_image, hero_order, is_featured')
            .eq('is_hero', true)
            .eq('is_active', true)
            .order('hero_order', { ascending: true })
            .limit(6);

        if (error) {
            console.error('Error fetching hero products:', error);
        } else {
            setHeroProducts(data || []);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="w-full bg-white">
                <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="flex items-center justify-center min-h-[400px] rounded-3xl bg-gray-50/50">
                        <LogoLoader />
                    </div>
                </div>
            </div>
        );
    }

    if (heroProducts.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white relative overflow-hidden">
            {/* Background Decor - Pink Fade Added */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-purple-100/40 via-pink-50/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-pink-100/40 to-transparent pointer-events-none" />

            {/* Reduced padding to decrease overall height */}
            <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                        renderBullet: (index, className) => {
                            return `<span class="${className} w-2 h-2 rounded-full bg-gray-200 transition-all duration-300 hover:bg-primary-400"></span>`;
                        },
                    }}
                    loop={heroProducts.length > 1}
                    className="hero-swiper rounded-3xl overflow-visible"
                >
                    {heroProducts.map((product) => (
                        <SwiperSlide key={product.id} className="overflow-visible">
                            <HeroSlideContent product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination Container - Moved closer */}
                <div className="custom-pagination flex justify-center gap-3 mt-4 md:mt-6 z-10 relative" />
            </div>

            <style jsx global>{`
        .swiper-pagination-bullet-active {
          background-color: #ec4899 !important; /* pink-500 mixed with purple */
          background-image: linear-gradient(to right, #7c3aed, #ec4899);
          width: 24px !important;
          border-radius: 999px !important;
        }
      `}</style>
        </div>
    );
}

function HeroSlideContent({ product }: { product: HeroProduct }) {
    const badge = product.is_featured ? 'Featured Choice' : 'Best Selling';
    const productLink = `/products/${product.slug}`;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.7 }
        },
    };

    return (
        <>
            {/* Desktop Layout (md+) - Reduced height and centered content */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center min-h-[400px] px-8 md:px-16 bg-gray-50/50 rounded-3xl border border-white/50 shadow-sm relative overflow-hidden backdrop-blur-sm">
                {/* Decorative Circle with Pink */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none" />

                {/* Text Content - Centered */}
                <motion.div
                    className="col-span-6 lg:col-span-5 lg:col-start-2 relative z-10 py-8 pl-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-white border border-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1.5">
                            <Star className="w-3 h-3 fill-current" />
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl lg:text-5xl font-display font-bold leading-[1.1] mb-3 text-gray-900 tracking-tight"
                    >
                        <span className="block text-primary-900">Experience</span>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            True Quality
                        </span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-base text-gray-600 mb-6 font-medium leading-relaxed max-w-sm">
                        Discover our {product.name}, crafted for excellence and designed to elevate your lifestyle.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                        <div className="bg-white/80 backdrop-blur rounded-xl p-3 border border-pink-50 shadow-sm inline-flex items-center justify-between gap-6 w-full max-w-sm">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Price</p>
                                <DualPriceDisplay basePrice={product.base_price} variant="card" className="scale-100 origin-left" />
                            </div>
                            <div className="h-8 w-px bg-gray-200" />
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Monthly</p>
                                <p className="text-sm font-bold text-pink-600">Available</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-1">
                            <Link
                                href={`${productLink}?plan=cash`}
                                className="flex-1 px-6 py-3 bg-gray-900 hover:bg-purple-900 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-purple-200 hover:-translate-y-0.5 flex justify-center items-center gap-2 group"
                            >
                                <ShoppingBag className="w-4 h-4 group-hover:animate-bounce" />
                                Order Now
                            </Link>
                            <Link
                                href={`${productLink}?plan=installment`}
                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-100 hover:border-pink-200 text-gray-900 hover:text-pink-700 text-sm font-semibold rounded-xl transition-all duration-300 flex justify-center items-center gap-2"
                            >
                                <CreditCard className="w-4 h-4" />
                                Installments
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Image - Brought closer */}
                <div className="col-span-6 lg:col-span-5 relative h-full flex items-center justify-center z-10">
                    <motion.div
                        className="relative w-full aspect-square max-w-[420px] flex items-center justify-center"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Abstract blobs behind image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/40 to-purple-200/40 rounded-full blur-2xl transform rotate-12 scale-90 animate-pulse" style={{ animationDuration: '4s' }} />

                        {product.featured_image ? (
                            <img
                                src={product.featured_image}
                                alt={product.name}
                                className="w-full h-full object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out rounded-xl"
                            />
                        ) : (
                            <div className="text-8xl relative z-10 grayscale opacity-20">📦</div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Mobile Layout (< md) */}
            <div className="md:hidden flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Image Area */}
                <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur border border-gray-200 text-gray-900 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                            {badge}
                        </span>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-100/30 rounded-full blur-xl" />

                    {product.featured_image ? (
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            src={product.featured_image}
                            alt={product.name}
                            className="w-full h-full object-contain p-6 relative z-10 rounded-3xl"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl text-gray-200">📦</div>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col gap-4 relative bg-white">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gray-200 rounded-full" /> {/* Pseudo handle */}

                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                            {product.name}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium line-clamp-2 px-2">
                            Premium quality, delivered to your door.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                        <DualPriceDisplay basePrice={product.base_price} variant="card" />
                        <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                                Best Value
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href={`${productLink}?plan=cash`}
                            className="flex items-center justify-center py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-md active:scale-95 transition-transform"
                        >
                            Buy Now
                        </Link>
                        <Link
                            href={`${productLink}?plan=installment`}
                            className="flex items-center justify-center py-3 bg-white border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl active:bg-gray-50 transition-colors"
                        >
                            Installments
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
