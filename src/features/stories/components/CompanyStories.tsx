'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules';
import { supabase } from '@/shared/lib/supabase';
import { CompanyStory } from '@/shared/types/database';
import { FiHeart, FiTruck, FiUsers, FiMapPin, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

const categoryConfig = {
    charity: {
        icon: FiHeart,
        gradient: 'from-pink-500 via-rose-500 to-red-500',
        bgGradient: 'from-pink-50 to-rose-50',
        accentColor: 'bg-pink-500',
        textColor: 'text-pink-600',
        label: 'Charity'
    },
    delivery: {
        icon: FiTruck,
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        bgGradient: 'from-blue-50 to-cyan-50',
        accentColor: 'bg-blue-500',
        textColor: 'text-blue-600',
        label: 'Delivery'
    },
    team: {
        icon: FiUsers,
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        bgGradient: 'from-green-50 to-emerald-50',
        accentColor: 'bg-green-500',
        textColor: 'text-green-600',
        label: 'Our Team'
    },
    community: {
        icon: FiMapPin,
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        bgGradient: 'from-orange-50 to-amber-50',
        accentColor: 'bg-orange-500',
        textColor: 'text-orange-600',
        label: 'Community'
    },
    event: {
        icon: FiCalendar,
        gradient: 'from-purple-500 via-violet-500 to-indigo-500',
        bgGradient: 'from-purple-50 to-violet-50',
        accentColor: 'bg-purple-500',
        textColor: 'text-purple-600',
        label: 'Events'
    }
};

export function CompanyStories() {
    const [stories, setStories] = useState<CompanyStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, []);

    async function fetchStories() {
        try {
            const { data, error } = await supabase
                .from('company_stories')
                .select('*')
                .eq('is_featured', true)
                .order('display_order', { ascending: true })
                .limit(6);

            if (error) throw error;
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (stories.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10" data-aos="fade-up">
                    <span className="inline-block px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full font-bold uppercase tracking-wider text-xs mb-3">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
                        Making a <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Difference</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover how we're giving back to our community through charity, quality service, and genuine care.
                    </p>
                </div>

                {/* Stories Carousel */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation, EffectCreative]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={stories.length > 1}
                        speed={1000}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={{
                            prevEl: '.stories-prev',
                            nextEl: '.stories-next',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        className="pb-16"
                    >
                        {stories.map((story, index) => {
                            const config = categoryConfig[story.category];
                            const Icon = config.icon;

                            return (
                                <SwiperSlide key={story.id}>
                                    <div
                                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[380px] flex flex-col"
                                        style={{
                                            animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
                                        }}
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            {/* Fallback Icon (behind image) */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Icon className="w-16 h-16 text-gray-300" />
                                            </div>

                                            {/* Main Image (on top) */}
                                            {story.image_url && (
                                                <img
                                                    src={story.image_url}
                                                    alt={story.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                                                />
                                            )}

                                            {/* Gradient Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t ${config.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-20`}></div>

                                            {/* Category Badge */}
                                            <div className="absolute top-3 left-3 z-30">
                                                <div className={`backdrop-blur-md bg-white/90 ${config.textColor} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon className="w-3.5 h-3.5" />
                                                    {config.label}
                                                </div>
                                            </div>

                                            {/* Decorative Corner */}
                                            <div className={`absolute bottom-0 right-0 w-20 h-20 ${config.accentColor} opacity-20 transform translate-x-10 translate-y-10 rotate-45 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-20`}></div>
                                        </div>

                                        {/* Content Section */}
                                        <div className={`flex-1 p-5 bg-gradient-to-br ${config.bgGradient} relative`}>
                                            {/* Accent Line */}
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                                                {story.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {story.description}
                                            </p>

                                            {/* Bottom Decoration */}
                                            <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                                <Icon className="w-12 h-12 text-gray-900" />
                                            </div>
                                        </div>

                                        {/* Hover Border Effect */}
                                        <div className={`absolute inset-0 border-2 border-transparent group-hover:border-primary-300 rounded-2xl transition-all duration-500 pointer-events-none`}></div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="stories-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button className="stories-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FiChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Animations & Custom Styles */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Custom Swiper Pagination */
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #cbd5e1;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                
                .swiper-pagination-bullet-active {
                    background: #dc2626 !important;
                    width: 32px !important;
                    border-radius: 5px !important;
                }
            `}</style>
        </section>
    );
}
