'use client';

import { useState, useEffect } from 'react';
import { FiStar, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { Review } from '@/shared/types/database';
import { getApprovedReviews } from '@/features/marketing/actions';
import { ReviewForm } from '@/features/marketing/components/ReviewForm';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

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

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4 self-start md:self-auto">
                        <Link
                            href="/"
                            className="p-2 rounded-full bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900">
                                Customer Reviews
                            </h1>
                            <p className="text-gray-500 mt-1">
                                See what our customers have to say about us
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsReviewFormOpen(true)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                    >
                        Write a Review
                    </button>
                </div>

                {/* Reviews Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-1 mb-4 text-accent-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed mb-6 italic">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">
                                                {review.name}
                                            </h4>
                                            {review.location && (
                                                <p className="text-xs text-gray-500">
                                                    {review.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date (Optional, if we want to show it) */}
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {review.product_name && (
                                    <div className="mt-4">
                                        <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded inline-block truncate max-w-full">
                                            Verified Purchase: {review.product_name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg mb-4">
                            No reviews yet. Be the first to share your experience!
                        </p>
                    </div>
                )}
            </div>

            <ReviewForm
                isOpen={isReviewFormOpen}
                onClose={() => {
                    setIsReviewFormOpen(false);
                    fetchReviews();
                }}
            />
        </main>
    );
}
