'use client';

import { useState, useEffect } from 'react';
import { FiX, FiStar, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '@/shared/types/database';
import { getApprovedReviews } from '../actions';


interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWriteReview: () => void;
}

export function ReviewsModal({ isOpen, onClose, onWriteReview }: ReviewsModalProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchReviews();
        }
    }, [isOpen]);

    async function fetchReviews() {
        setLoading(true);
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col pointer-events-auto overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 font-display">Customer Reviews</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Based on {reviews.length} reviews
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            onWriteReview();
                                        }}
                                        className="hidden sm:block text-sm font-semibold text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-full transition-colors"
                                    >
                                        Write a Review
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                                {loading ? (
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse h-32" />
                                        ))}
                                    </div>
                                ) : reviews.length > 0 ? (
                                    <div className="grid gap-4">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:gap-6"
                                            >
                                                {/* Avatar & Info */}
                                                <div className="flex items-center sm:items-start gap-4 sm:min-w-[120px]">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg shrink-0">
                                                        {review.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="sm:hidden">
                                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                        {review.location && <p className="text-xs text-gray-500">{review.location}</p>}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="hidden sm:flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                            {review.location && <p className="text-xs text-gray-500">{review.location}</p>}
                                                        </div>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-1 mb-2 text-accent-gold">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FiStar
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                                        {review.text}
                                                    </p>

                                                    {review.product_name && (
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                            Verified Purchase: {review.product_name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500">No reviews yet.</p>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Footer Action */}
                            <div className="sm:hidden p-4 border-t border-gray-100 bg-white">
                                <button
                                    onClick={() => {
                                        onClose();
                                        onWriteReview();
                                    }}
                                    className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl shadow-md active:scale-95 transition-transform"
                                >
                                    Write a Review
                                </button>
                            </div>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
