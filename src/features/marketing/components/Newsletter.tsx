'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';

export function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        setTimeout(() => {
            toast.success('Thank you for subscribing!');
            setEmail('');
        }, 500);
    };

    return (
        <section className="bg-primary-900 py-12 lg:py-16 relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary-800 opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-accent-gold opacity-10 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

                    {/* Text Content */}
                    <div className="text-center lg:text-left max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                            Get <span className="text-accent-gold">Exclusive Deals</span> & Updates
                        </h2>
                        <p className="text-primary-100 text-base md:text-lg">
                            Subscribe to our newsletter to receive early access to sales, new product arrivals, and special promotions directly to your inbox.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full pl-10 pr-4 py-3.5 rounded-lg bg-white/10 border border-primary-700 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:bg-white/20 transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3.5 bg-accent-gold hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-primary-300 text-xs mt-3 text-center lg:text-left">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
