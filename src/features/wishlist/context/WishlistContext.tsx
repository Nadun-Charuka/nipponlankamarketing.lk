'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/shared/types/database';
import toast from 'react-hot-toast';

interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: Product) => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('nipponlanka_wishlist');
        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Failed to parse wishlist data', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to LocalStorage whenever wishlist changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('nipponlanka_wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, isInitialized]);

    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setWishlistItems((prev) => [...prev, product]);
            toast.success('Added to Wishlist');
        }
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
        toast.success('Removed from Wishlist');
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
                wishlistCount: wishlistItems.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
