'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar, FiPlus, FiList } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import { Review } from '@/shared/types/database';
import { getApprovedReviews } from '../actions';
import { ReviewForm } from './ReviewForm';
import { ReviewsModal } from './ReviewsModal';

export function Testimonials() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getApprovedReviews();
                setReviews(data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    if (loading) return null; // Or a loading skeleton

    return (
        <section className="py-16 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Our Happy Customers</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">
                            What People Say About Us
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto text-center">
                        <button
                            onClick={() => setIsReviewsModalOpen(true)}
                            className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-6 py-3 rounded-full font-bold transition-all shadow-sm hover:shadow-md order-2 sm:order-1"
                        >
                            <FiList className="w-5 h-5 opacity-70" />
                            View All Reviews
                        </button>
                        <button
                            onClick={() => setIsReviewFormOpen(true)}
                            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform active:scale-95 sm:hover:-translate-y-1 order-1 sm:order-2"
                        >
                            <FiPlus className="w-5 h-5" />
                            Write a Review
                        </button>
                    </div>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 mb-4">No reviews yet. Be the first to share your experience!</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsReviewFormOpen(true)}
                                className="text-primary-600 font-bold hover:underline"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides={reviews.length === 1} // Center if only one review
                        loop={reviews.length > 2} // Only loop if enough slides
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
                        {reviews.map((testimonial) => (
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
                                    <p className="text-gray-700 leading-relaxed mb-6 italic flex-grow line-clamp-4">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg shrink-0">
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                                            {testimonial.location && (
                                                <p className="text-xs text-gray-500">{testimonial.location}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Badge */}
                                    {testimonial.product_name && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded inline-block truncate max-w-full">
                                                Verified Purchase: {testimonial.product_name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            {/* Review Form Modal */}
            <ReviewForm
                isOpen={isReviewFormOpen}
                onClose={() => {
                    setIsReviewFormOpen(false);
                    // Refresh reviews after submission
                    getApprovedReviews().then(setReviews);
                }}
            />

            {/* View All Reviews Modal */}
            <ReviewsModal
                isOpen={isReviewsModalOpen}
                onClose={() => setIsReviewsModalOpen(false)}
                onWriteReview={() => {
                    // setIsReviewsModalOpen(false); // Can keep it open if we want
                    setIsReviewFormOpen(true);
                }}
            />
        </section>
    );
}


