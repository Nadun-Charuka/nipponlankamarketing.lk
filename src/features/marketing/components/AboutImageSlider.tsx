'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const COMPANY_IMAGES = [
    {
        id: 1,
        src: 'https://hhkanlbzspxxwraatkgt.supabase.co/storage/v1/object/public/about_hero/boss.JPG',
        alt: 'Electronics Showroom'
    },
    {
        id: 2,
        src: 'https://hhkanlbzspxxwraatkgt.supabase.co/storage/v1/object/public/about_hero/for%20about%20us%201.jpg',
        alt: 'Nippon Lanka Team'
    },
    {
        id: 3,
        src: 'https://hhkanlbzspxxwraatkgt.supabase.co/storage/v1/object/public/about_hero/for%20about%20us%202.jpg',
        alt: 'Office Interior'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        alt: 'Customer Service'
    }
];

export function AboutImageSlider() {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-purple-900">
                        A Glimpse Inside
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        From our state-of-the-art showrooms to our dedicated team working behind the scenes.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full"
            >
                <Swiper
                    modules={[Autoplay, Pagination, EffectCoverflow]}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2.5,
                        },
                    }}
                    className="w-full h-[300px] md:h-[450px] pb-12 [&_.swiper-pagination-bullet]:bg-purple-300 [&_.swiper-pagination-bullet-active]:bg-purple-600"
                >
                    {COMPANY_IMAGES.map((image) => (
                        <SwiperSlide key={image.id} className="relative w-[80%] md:w-[60%] rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
                            <div className="relative w-full h-full group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                                    <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                                        <p className="text-white font-medium text-sm md:text-base tracking-wide">{image.alt}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
}
