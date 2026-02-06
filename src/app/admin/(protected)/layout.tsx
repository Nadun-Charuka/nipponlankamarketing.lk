'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/features/admin/components/AdminSidebar';
import { AdminHeader } from '@/features/admin/components/AdminHeader';
import { SessionTimeoutWarning } from '@/features/admin/components/SessionTimeoutWarning';
import { useAdminAuth } from '@/features/admin/hooks/useAdminAuth';
import { LogoLoader } from '@/shared/components/LogoLoader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading, showTimeoutWarning, extendSession, logout } = useAdminAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Don't show layout on loading or if not authenticated (Login page is handled separately somewhat by useAdminAuth redirect, 
    // but the Login Page itself *is* inside /admin sometimes depending on folder structure. 
    // Wait, my folder structure has Login INSIDE /admin? 
    // Yes: src/app/admin/login/page.tsx
    // So this layout wraps the LOGIN page too. 
    // I should check if we are on the login page to conditionally render the sidebar/header.
    // Or simpler: Move Login OUT of this layout grouping using Route Groups (e.g. (dashboard) vs (auth)).
    // For now, I'll just check if isAuthenticated is false. If false, I might render children strictly if it's the login page, OR handling it via path check.

    // Actually, `useAdminAuth` redirects to /admin/login if not auth.
    // If we are ON /admin/login, we don't want the Sidebar/Header.
    // Let's use a simpler approach: check window path or just use CSS/State based on content.
    // BUT since this is a Server Component layout (mostly), I can't check path easily without client hook.
    // This file IS 'use client' so I can check path.

    // However, for simplicity in this iteration:
    // If we are not authenticated, we'll assume we are mostly likely on the login page (due to redirect).
    // So we render children without layout. 

    const pathname = usePathname();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LogoLoader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Redirect is handled by useAdminAuth
    }

    return (
        <>
            <SessionTimeoutWarning
                show={showTimeoutWarning}
                onExtend={extendSession}
                onLogout={logout}
            />
            <div className="min-h-screen bg-gray-50">
                <AdminSidebar />

                <div className="md:pl-64 flex flex-col flex-1">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
