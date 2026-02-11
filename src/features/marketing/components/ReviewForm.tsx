'use client';

import { useState } from 'react';
import { FiStar, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { submitReview, ReviewFormData } from '../actions';

interface ReviewFormProps {
    isOpen: boolean;
    onClose: () => void;
    productName?: string;
}

export function ReviewForm({ isOpen, onClose, productName }: ReviewFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    // Form states
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [text, setText] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(productName || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !text || !rating) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData: ReviewFormData = {
                name,
                location,
                rating,
                text,
                product_name: selectedProduct,
            };

            const result = await submitReview(formData);

            if (result.success) {
                toast.success(result.message);
                // Reset form
                setName('');
                setLocation('');
                setText('');
                setRating(5);
                setSelectedProduct('');
                onClose();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Rating Input */}
                                <div className="flex flex-col items-center gap-2 mb-2">
                                    <label className="text-sm font-medium text-gray-700">Your Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <FiStar
                                                    className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                            ? 'fill-accent-gold text-accent-gold'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="location" className="text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                            placeholder="e.g. Colombo"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="product" className="text-sm font-medium text-gray-700">
                                        Product Purchased (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="product"
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProduct(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="e.g. Samsung TV"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="review" className="text-sm font-medium text-gray-700">
                                        Your Review <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="review"
                                        required
                                        rows={4}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                                        placeholder="Share your experience..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
