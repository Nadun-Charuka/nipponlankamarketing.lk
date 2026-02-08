'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/shared/types/database';
import toast from 'react-hot-toast';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number, options?: { openDrawer?: boolean }) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('nipponlanka_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart data', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to LocalStorage whenever cart changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('nipponlanka_cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized]);

    const addToCart = (product: Product, quantity: number = 1, options: { openDrawer?: boolean } = { openDrawer: true }) => {
        // Check existence logic outside setter to avoid double-toast in Strict Mode
        const existingItem = cartItems.find(item => item.product.id === product.id);

        if (existingItem) {
            toast.success(`Updated quantity for ${product.name}`);
            setCartItems(prev => prev.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            toast.success(`Added ${product.name} to cart`);
            setCartItems(prev => [...prev, { product, quantity }]);
        }

        // Open cart drawer if requested (default: true)
        if (options.openDrawer) {
            setIsCartOpen(true);
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('nipponlanka_cart');
    };

    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.product.cash_price || item.product.base_price || 0;
        return total + (price * item.quantity);
    }, 0);

    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            itemCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
