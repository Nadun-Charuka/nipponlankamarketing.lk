'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Product } from '@/shared/types/database';
import { ProductCard } from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductCarouselProps {
    products: Product[];
    title?: string;
    onQuickView?: (product: Product) => void;
    onAddToWishlist?: (productId: string) => void;
}

export function ProductCarousel({
    products,
    title = 'Featured Products',
    onQuickView,
    onAddToWishlist
}: ProductCarouselProps) {
    return (
        <div className="product-carousel">
            {title && (
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
                    {title}
                </h2>
            )}

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                className="product-swiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            product={product}
                            onQuickView={onQuickView}
                            onAddToWishlist={onAddToWishlist}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .product-swiper .swiper-button-next,
        .product-swiper .swiper-button-prev {
          color: #7E22CE;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .product-swiper .swiper-button-next:after,
        .product-swiper .swiper-button-prev:after {
          font-size: 16px;
        }

        .product-swiper .swiper-pagination {
          bottom: -40px;
        }

        .product-swiper .swiper-pagination-bullet {
          background: #D8B4FE;
        }

        .product-swiper .swiper-pagination-bullet-active {
          background: #7E22CE;
        }
      `}</style>
        </div>
    );
}
