'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/shared/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

export function useAdminAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // 1. Check active session
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error('Auth Check Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            setIsLoading(false);
            
            // Optional: Handle redirects here if preferred, but usually done in effects or middleware
            if (session?.user && pathname === '/admin/login') {
                router.push('/admin');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    const login = async (email: string, pass: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: pass,
        });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return false;
        }

        toast.success('Welcome back, Admin!');
        router.push('/admin');
        return true;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/admin/login');
        toast.success('Logged out successfully');
    };

    // Protect routes
    useEffect(() => {
        if (!isLoading && !user && pathname?.startsWith('/admin') && pathname !== '/admin/login') {
            // Uncomment to enforce protection
            router.push('/admin/login');
        }
    }, [isLoading, user, pathname, router]);

    return {
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        logout
    };
}
