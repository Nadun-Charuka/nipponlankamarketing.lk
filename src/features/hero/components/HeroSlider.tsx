'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';
import { supabase } from '@/shared/lib/supabase';
import { LogoLoader } from '@/shared/components/LogoLoader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
            <div className="relative bg-white border-b border-gray-100">
                <div className="container mx-auto px-0 md:px-8 md:py-8">
                    <div className="flex items-center justify-center min-h-[320px] md:rounded-2xl bg-gray-50">
                        <LogoLoader />
                    </div>
                </div>
            </div>
        );
    }

    if (heroProducts.length === 0) {
        return (
            <div className="relative bg-white border-b border-gray-100">
                <div className="container mx-auto px-0 md:px-8 md:py-8">
                    <div className="flex flex-col items-center justify-center min-h-[320px] md:rounded-2xl bg-gradient-to-br from-primary-50 to-white p-8 text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Hero Items Yet</h3>
                        <p className="text-gray-600">Add products to the hero slider from the admin panel.</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="relative bg-white border-b border-gray-100">
            <div className="container mx-auto px-0 md:px-8 md:py-8">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-700',
                    }}
                    navigation
                    loop={heroProducts.length > 1}
                    className="hero-swiper md:rounded-2xl overflow-hidden"
                >
                    {heroProducts.map((product) => {
                        const badge = product.is_featured ? 'FEATURED' : undefined;
                        const productLink = `/products/${product.slug}`;

                        return (
                            <SwiperSlide key={product.id}>
                                {/* Desktop Layout (Hidden on Mobile) */}
                                <div className="hidden md:block bg-white">
                                    <div className="grid grid-cols-2 gap-2 items-center min-h-[320px] px-12">
                                        {/* Content Side */}
                                        <div className="order-1 flex flex-col justify-center items-start z-10 py-8 animate-fadeInUp">
                                            {/* Badge */}
                                            {badge && (
                                                <span className="inline-block px-3 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                                                    {badge}
                                                </span>
                                            )}

                                            {/* Title */}
                                            <h2 className="text-4xl font-display font-bold leading-tight mb-2">
                                                <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                                                    SPECIAL OFFER
                                                </span>
                                            </h2>
                                            <p className="text-base text-gray-600 mb-4 font-medium">Premium Quality Products</p>

                                            {/* Product Name & Price */}
                                            <div className="mb-5 w-full max-w-sm bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                        {product.name}
                                                    </h3>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <DualPriceDisplay basePrice={product.base_price} variant="card" className="scale-90 origin-right" />
                                                </div>
                                            </div>

                                            {/* CTA Buttons */}
                                            <div className="flex gap-3">
                                                <Link
                                                    href={`${productLink}?plan=cash`}
                                                    className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold rounded-lg transition-colors flex gap-2 items-center shadow-sm hover:shadow"
                                                >
                                                    Buy Now
                                                </Link>
                                                <Link
                                                    href={`${productLink}?plan=installment`}
                                                    className="px-5 py-2.5 bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 text-sm font-semibold rounded-lg transition-colors flex gap-2 items-center"
                                                >
                                                    Installments
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Image Side */}
                                        <div className="order-2 relative h-full flex items-center justify-center py-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                                            <div className="relative w-full h-[280px] flex items-center justify-center bg-gradient-to-br from-purple-50 via-primary-50 to-white rounded-2xl overflow-hidden">
                                                {product.featured_image ? (
                                                    <img
                                                        src={product.featured_image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                                                        onError={(e) => {
                                                            // Fallback to placeholder if image fails to load
                                                            e.currentTarget.style.display = 'none';
                                                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                                            if (placeholder) placeholder.style.display = 'block';
                                                        }}
                                                    />
                                                ) : null}
                                                {/* Placeholder - shown if no image or image fails */}
                                                <div
                                                    className="text-center text-gray-300"
                                                    style={{ display: product.featured_image ? 'none' : 'block' }}
                                                >
                                                    <div className="text-7xl mb-2">📦</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Layout (Hidden on Desktop) */}
                                <div className="block md:hidden bg-white pb-6">
                                    {/* Mobile Image Section */}
                                    <div className="relative w-full h-[200px] bg-gradient-to-b from-purple-50 via-primary-50 to-white flex items-center justify-center mb-4 overflow-hidden">
                                        {badge && (
                                            <span className="absolute top-4 left-4 px-2 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm z-10">
                                                {badge}
                                            </span>
                                        )}
                                        {product.featured_image ? (
                                            <img
                                                src={product.featured_image}
                                                alt={product.name}
                                                className="w-full h-full object-contain p-4"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                                    if (placeholder) placeholder.style.display = 'block';
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className="text-6xl text-gray-300"
                                            style={{ display: product.featured_image ? 'none' : 'block' }}
                                        >
                                            📦
                                        </div>
                                    </div>

                                    {/* Mobile Content Section */}
                                    <div className="px-4 text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                                            SPECIAL OFFER
                                        </h2>
                                        <p className="text-sm text-gray-600 mb-3">Premium Quality Products</p>

                                        {/* Simplified Product Display for Mobile */}
                                        <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100 mx-auto max-w-[320px]">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <DualPriceDisplay basePrice={product.base_price} variant="card" />
                                        </div>

                                        {/* Mobile CTA Buttons */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href={`${productLink}?plan=cash`}
                                                className="flex justify-center items-center py-2.5 bg-primary-700 text-white text-sm font-semibold rounded shadow-sm"
                                            >
                                                Buy Now
                                            </Link>
                                            <Link
                                                href={`${productLink}?plan=installment`}
                                                className="flex justify-center items-center py-2.5 bg-white border border-primary-700 text-primary-700 text-sm font-semibold rounded"
                                            >
                                                Installments
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #4C1D95; /* primary-900 */
          background: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #C4B5FD;
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #6D28D9 !important;
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
