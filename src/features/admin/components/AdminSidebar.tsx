'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBox, FiShoppingBag, FiSettings, FiUsers, FiLogOut, FiGrid } from 'react-icons/fi';
import { useAdminAuth } from '../hooks/useAdminAuth';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Products', href: '/admin/products', icon: FiBox },
    { name: 'Categories', href: '/admin/categories', icon: FiGrid },
    // Orders, Customers, Settings hidden for Phase 1 as requested
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAdminAuth();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-100 bg-white">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center transform rotate-3">
                        <span className="text-white font-display font-bold text-xl transform -rotate-3">N</span>
                    </div>
                    <div>
                        <span className="font-display font-bold text-xl text-gray-900 leading-none block">Nippon</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                `}
                            >
                                <item.icon
                                    className={`
                                        mr-3 flex-shrink-0 h-5 w-5 transition-colors
                                        ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                                    `}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User Account / Logout */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            A
                        </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Admin User
                        </p>
                        <button
                            onClick={logout}
                            className="text-xs font-medium text-gray-500 group-hover:text-gray-700 hover:text-red-600 flex items-center gap-1 mt-0.5 transition-colors"
                        >
                            <FiLogOut className="w-3 h-3" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
