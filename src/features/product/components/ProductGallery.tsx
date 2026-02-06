'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import { type Swiper as SwiperClass } from 'swiper/types';
import { Product } from '@/shared/types/database';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

interface ProductGalleryProps {
    images?: string[];
    featuredImage: string | null;
    productName: string;
}

export function ProductGallery({ images = [], featuredImage, productName }: ProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    // Combine featured image with gallery images if available
    const allImages = featuredImage ? [featuredImage, ...images] : images;

    // Fallback if no images
    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-4xl text-gray-300">
                📦
            </div>
        );
    }

    return (
        <div className="product-gallery space-y-3">
            {/* Main Slider */}
            <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    pagination={{ clickable: true }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="h-full w-full"
                >
                    {allImages.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full flex items-center justify-center bg-white p-4">
                                {/* In a real app, use Next.js Image with object-contain */}
                                {/* <Image src={img} alt={`${productName} - View ${index + 1}`} fill className="object-contain" /> */}
                                <div className="text-6xl text-gray-200">📦</div>
                                <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-400">
                                    {index + 1} / {allImages.length}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-1 bg-accent-red text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
                        -20%
                    </span>
                </div>
            </div>

            {/* Thumbnail Slider (Desktop only usually, or small on mobile) */}
            <div className="hidden md:block">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbs-swiper h-20"
                >
                    {allImages.map((img, index) => (
                        <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 !h-full">
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 opacity-60 hover:opacity-100 transition-opacity aria-selected:opacity-100 thumbs-slide-active:opacity-100 thumbs-slide-active:ring-2 thumbs-slide-active:ring-primary-500">
                                <span className="text-xl">📦</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .thumbs-slide-active {
                    opacity: 1 !important;
                    border-color: #A855F7 !important;
                }
                
                .swiper-button-next,
                .swiper-button-prev {
                    color: #111827;
                    background: rgba(255, 255, 255, 0.8);
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                }
                
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    font-size: 14px;
                    font-weight: bold;
                }
                
                .swiper-pagination-bullet-active {
                    background: #A855F7;
                }
            `}</style>
        </div>
    );
}
