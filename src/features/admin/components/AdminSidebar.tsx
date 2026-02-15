'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiHome, FiBox, FiShoppingBag, FiSettings, FiUsers, FiLogOut, FiGrid, FiImage, FiFileText } from 'react-icons/fi';
import { useAdminAuth } from '../hooks/useAdminAuth';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Products', href: '/admin/products', icon: FiBox },
    { name: 'Categories', href: '/admin/categories', icon: FiGrid },
    { name: 'Hero Items', href: '/admin/hero-items', icon: FiImage },
    { name: 'Stories', href: '/admin/stories', icon: FiFileText },
    // Orders, Customers, Settings hidden for Phase 1 as requested
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAdminAuth();

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 flex-shrink-0 px-6 border-b border-gray-100 bg-white">
                {/* Logo */}
                <Link href="/admin" className="flex flex-col justify-center flex-shrink-0 group">
                    <div className="flex items-center gap-1">
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Nippon Lanka Marketing"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x leading-none">
                            ippon Lanka
                        </span>
                    </div>
                    <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase overflow-hidden whitespace-nowrap pl-1">
                        Marketing Admin
                    </span>
                </Link>

                <Link
                    href="/"
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-1"
                    title="View Website"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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
