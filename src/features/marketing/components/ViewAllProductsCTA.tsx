'use client';

import Link from 'next/link';
import { FiArrowRight, FiGrid } from 'react-icons/fi';

export function ViewAllProductsCTA() {
    return (
        <section className="bg-white py-6 md:py-8">
            <div className="container mx-auto px-4">
                {/* Desktop: Card Layout, Mobile: Minimal */}
                <div className="group relative overflow-hidden rounded-2xl md:bg-white md:border md:border-gray-100 p-0 md:p-10 md:shadow-sm transition-all duration-500 md:hover:shadow-lg md:hover:border-primary-100">

                    {/* Desktop Background & Decor */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-50" />
                    <div className="hidden md:block absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-bl-full opacity-60" />
                    <div className="hidden md:block absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-gray-50 to-transparent rounded-tr-full opacity-60" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

                        {/* Text hidden on mobile as per request */}
                        <div className="hidden md:block max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                                Discover Our Complete Collection
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg">
                                Explore our full range of premium furniture and electronics.
                            </p>
                        </div>

                        <Link
                            href="/products"
                            className="relative overflow-hidden w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-shimmer-bg text-white px-8 py-4 rounded-xl md:rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap min-w-[200px] animate-attention-bounce"
                        >
                            <div className="relative z-10 flex items-center gap-2">
                                <FiGrid className="w-5 h-5" />
                                <span>View All Products</span>
                                <FiArrowRight className="w-5 h-5" />
                            </div>

                            {/* Shine effect overlay */}
                            <div className="absolute inset-0 -translate-x-full animate-[shine_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer-bg {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .animate-shimmer-bg {
          animation: shimmer-bg 3s linear infinite;
        }
        
        @keyframes attention-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-attention-bounce {
          animation: attention-bounce 2s ease-in-out infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          20% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </section>
    );
}
