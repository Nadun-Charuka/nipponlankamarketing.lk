'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/shared/lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

// Session timeout configuration
const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 60 minutes
const WARNING_BEFORE_LOGOUT = 5 * 60 * 1000; // 5 minutes warning

export function useAdminAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Reset activity timer
    const resetActivity = () => {
        setLastActivity(Date.now());
        setShowTimeoutWarning(false);
    };

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

    // 3. Track user activity
    useEffect(() => {
        if (!user) return; // Only track activity when logged in

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
        
        events.forEach(event => {
            window.addEventListener(event, resetActivity);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, resetActivity);
            });
        };
    }, [user]);

    // 4. Check for inactivity
    useEffect(() => {
        if (!user) return; // Only check when logged in

        const interval = setInterval(() => {
            const inactiveTime = Date.now() - lastActivity;
            
            if (inactiveTime > INACTIVITY_TIMEOUT) {
                // Auto logout
                logout();
                toast.error('Session expired due to inactivity');
            } else if (inactiveTime > INACTIVITY_TIMEOUT - WARNING_BEFORE_LOGOUT) {
                // Show warning
                setShowTimeoutWarning(true);
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [lastActivity, user]);

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
        resetActivity(); // Reset activity on login
        router.push('/admin');
        return true;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setShowTimeoutWarning(false);
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
        logout,
        showTimeoutWarning,
        extendSession: resetActivity,
    };
}
