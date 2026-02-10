'use client';

import { FiCreditCard, FiTruck, FiShield } from 'react-icons/fi';

const banners = [
    {
        id: 1,
        title: '20% CASH DISCOUNT',
        subtitle: 'On All Items',
        icon: <FiCreditCard className="w-5 h-5 text-primary-600" />,
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-200',
        textColor: 'text-primary-900',
        subtitleColor: 'text-primary-600',
        gradientBorder: 'from-primary-400 via-primary-600 to-primary-400',
    },
    {
        id: 2,
        title: 'FREE DELIVERY',
        subtitle: 'Western Province',
        icon: <FiTruck className="w-5 h-5 text-accent-green" />,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-gray-900',
        subtitleColor: 'text-accent-green',
        gradientBorder: 'from-green-400 via-accent-green to-green-400',
    },
    {
        id: 3,
        title: '2+ YEAR WARRANTY',
        subtitle: 'Official Manufacturer',
        icon: <FiShield className="w-5 h-5 text-accent-gold" />,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-gray-900',
        subtitleColor: 'text-accent-gold',
        gradientBorder: 'from-amber-400 via-accent-gold to-amber-400',
    },
];

export function PromoBanners() {
    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className="relative animate-fadeIn"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Animated Gradient Border */}
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${banner.gradientBorder} opacity-75 animate-border-flow`} />

                            {/* Card Content */}
                            <div className={`relative m-[2px] overflow-hidden rounded-xl ${banner.bgColor} border ${banner.borderColor} p-4 group hover:shadow-lg transition-all duration-300`}>
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                {/* Pulse Animation Background */}
                                <div className="absolute inset-0 bg-white/50 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10 flex items-center gap-3">
                                    {/* Icon with Bounce */}
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:animate-bounce-subtle">
                                        {banner.icon}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm font-bold ${banner.textColor} uppercase tracking-wide leading-tight`}>
                                            {banner.title}
                                        </h3>
                                        <p className={`text-xs ${banner.subtitleColor} font-medium mt-0.5`}>
                                            {banner.subtitle}
                                        </p>
                                    </div>

                                    {/* Decorative Dot */}
                                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${banner.subtitleColor.replace('text-', 'bg-')} animate-ping-slow`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.1;
                    }
                }

                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-4px);
                    }
                }

                @keyframes border-flow {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-ping-slow {
                    animation: ping-slow 2s ease-in-out infinite;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 0.6s ease-in-out;
                }

                .animate-border-flow {
                    background-size: 200% 200%;
                    animation: border-flow 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
