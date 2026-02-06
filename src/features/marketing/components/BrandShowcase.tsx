'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const brands = [
    { id: 1, name: 'Samsung', color: '#1428A0' },
    { id: 2, name: 'LG', color: '#A50034' },
    { id: 3, name: 'Sony', color: '#000000' },
    { id: 4, name: 'Panasonic', color: '#00447C' },
    { id: 5, name: 'Abans', color: '#ED1C24' },
    { id: 6, name: 'Singer', color: '#EC1C24' },
    { id: 7, name: 'Damro', color: '#0055A4' },
    { id: 8, name: 'Innovex', color: '#FF6600' },
];

export function BrandShowcase() {
    return (
        <section className="py-12 border-y border-gray-100 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-xl font-bold text-gray-400 uppercase tracking-widest mb-8">
                    Trusted by Top Brands
                </h2>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={40}
                    slidesPerView={3}
                    loop={true}
                    speed={3000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                    className="brand-swiper"
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div
                                className="group flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                                title={brand.name}
                            >
                                {/* 
                     In a real app, use <Image> with grayscale class.
                     For now, using text with color reveal on hover.
                 */}
                                <div className="h-12 w-full flex items-center justify-center">
                                    <span
                                        className="text-xl font-bold text-gray-400 group-hover:text-[var(--brand-color)] transition-colors duration-300"
                                        style={{ '--brand-color': brand.color } as React.CSSProperties}
                                    >
                                        {brand.name}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear;
        }
      `}</style>
        </section>
    );
}
