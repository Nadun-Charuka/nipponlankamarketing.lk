'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        id: 1,
        name: 'Dilshan Perera',
        location: 'Colombo 05',
        rating: 5,
        text: "Excellent service! I ordered a Samsung TV and it was delivered the same day. The dual price option is great, got a good cash discount.",
        product: 'Samsung 55" 4K Smart TV',
    },
    {
        id: 2,
        name: 'Kumari Silva',
        location: 'Kandy',
        rating: 5,
        text: "Trusted place to buy home appliances. The installment plan was very helpful. Customer support is very responsive on WhatsApp.",
        product: 'LG Double Door Refrigerator',
    },
    {
        id: 3,
        name: 'Mohamed Fazil',
        location: 'Dehiwala',
        rating: 4,
        text: "Good collection of products. Prices are competitive compared to others. Delivery was fast and the team was professional.",
        product: 'Abans Washing Machine',
    },
    {
        id: 4,
        name: 'Samanthi Gunawardena',
        location: 'Gampaha',
        rating: 5,
        text: "Highly recommend Nippon Lanka! Bought a sofa set and it looks amazing. High quality furniture and good finish.",
        product: 'Damro Sofa Set',
    },
];

export function Testimonials() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Our Happy Customers</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">
                        What People Say About Us
                    </h2>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-600',
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                    }}
                    className="pb-12"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4 text-accent-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 leading-relaxed mb-6 italic flex-grow">
                                    "{testimonial.text}"
                                </p>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>

                                {/* Product Badge */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                                        Verified Purchase: {testimonial.product}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
