'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { DualPriceDisplay } from '@/features/pricing/components/DualPriceDisplay';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    productName: string;
    basePrice: number;
    image: string;
    badge?: string;
    cashLink: string;
    installmentLink: string;
}

const heroSlides: HeroSlide[] = [
    {
        id: '1',
        title: 'SPECIAL OFFER',
        subtitle: 'Premium 4K Entertainment',
        productName: 'Samsung 55" 4K Smart TV',
        basePrice: 250000,
        image: '/hero/samsung-tv.jpg',
        badge: '20% OFF',
        cashLink: '/products/samsung-55-4k-smart-tv?plan=cash',
        installmentLink: '/products/samsung-55-4k-smart-tv?plan=installment',
    },
    {
        id: '2',
        title: 'KEEP IT FRESH',
        subtitle: 'Energy Efficient Cooling',
        productName: 'LG 420L Double Door Refrigerator',
        basePrice: 180000,
        image: '/hero/lg-fridge.jpg',
        badge: 'BEST SELLER',
        cashLink: '/products/lg-420l-refrigerator?plan=cash',
        installmentLink: '/products/lg-420l-refrigerator?plan=installment',
    },
    {
        id: '3',
        title: 'LAUNDRY SALES',
        subtitle: 'Advanced Washing Technology',
        productName: 'Abans 8kg Front Load Washing Machine',
        basePrice: 95000,
        image: '/hero/washing-machine.jpg',
        badge: 'NEW ARRIVAL',
        cashLink: '/products/abans-8kg-washing-machine?plan=cash',
        installmentLink: '/products/abans-8kg-washing-machine?plan=installment',
    },
];

export function HeroSlider() {
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
                    loop
                    className="hero-swiper md:rounded-2xl overflow-hidden"
                >
                    {heroSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {/* Desktop Layout (Hidden on Mobile) */}
                            <div className="hidden md:block bg-white">
                                <div className="grid grid-cols-2 gap-12 items-center min-h-[320px] px-12">
                                    {/* Content Side */}
                                    <div className="order-1 flex flex-col justify-center items-start z-10 py-8">
                                        {/* Badge */}
                                        {slide.badge && (
                                            <span className="inline-block px-3 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                                                {slide.badge}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h2 className="text-4xl font-display font-bold text-gray-900 leading-tight mb-2">
                                            {slide.title}
                                        </h2>
                                        <p className="text-base text-gray-600 mb-4 font-medium">{slide.subtitle}</p>

                                        {/* Product Name & Price */}
                                        <div className="mb-5 w-full max-w-sm bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                    {slide.productName}
                                                </h3>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <DualPriceDisplay basePrice={slide.basePrice} variant="card" className="scale-90 origin-right" />
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="flex gap-3">
                                            <Link
                                                href={slide.cashLink}
                                                className="px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold rounded-lg transition-colors flex gap-2 items-center shadow-sm hover:shadow"
                                            >
                                                Buy Now
                                            </Link>
                                            <Link
                                                href={slide.installmentLink}
                                                className="px-5 py-2.5 bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 text-sm font-semibold rounded-lg transition-colors flex gap-2 items-center"
                                            >
                                                Installments
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image Side */}
                                    <div className="order-2 relative h-full flex items-center justify-center py-6">
                                        <div className="relative w-full h-[280px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-white rounded-2xl">
                                            {/* Placeholder for product image */}
                                            <div className="text-center text-gray-300">
                                                <div className="text-7xl mb-2">📦</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Layout (Hidden on Desktop) */}
                            <div className="block md:hidden bg-white pb-6">
                                {/* Mobile Image Section */}
                                <div className="relative w-full h-[200px] bg-gradient-to-b from-primary-50 to-white flex items-center justify-center mb-4">
                                    {slide.badge && (
                                        <span className="absolute top-4 left-4 px-2 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
                                            {slide.badge}
                                        </span>
                                    )}
                                    <div className="text-6xl text-gray-300">📦</div>
                                </div>

                                {/* Mobile Content Section */}
                                <div className="px-4 text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-3">{slide.subtitle}</p>

                                    {/* Simplified Product Display for Mobile */}
                                    <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100 mx-auto max-w-[320px]">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
                                            {slide.productName}
                                        </h3>
                                        <DualPriceDisplay basePrice={slide.basePrice} variant="card" />
                                    </div>

                                    {/* Mobile CTA Buttons */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href={slide.cashLink}
                                            className="flex justify-center items-center py-2.5 bg-primary-700 text-white text-sm font-semibold rounded shadow-sm"
                                        >
                                            Buy Now
                                        </Link>
                                        <Link
                                            href={slide.installmentLink}
                                            className="flex justify-center items-center py-2.5 bg-white border border-primary-700 text-primary-700 text-sm font-semibold rounded"
                                        >
                                            Installments
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Swiper Styles */}
            <style jsx global>{`
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
