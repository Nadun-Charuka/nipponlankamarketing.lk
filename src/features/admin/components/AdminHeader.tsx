'use client';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { useAdminAuth } from '@/features/admin/hooks/useAdminAuth';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { user, logout } = useAdminAuth();

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6 lg:px-8">
            <button
                type="button"
                className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden mr-4"
                onClick={onMenuClick}
            >
                <span className="sr-only">Open sidebar</span>
                <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex items-center justify-end flex-1">

                {/* Right Side Actions */}
                <div className="ml-4 flex items-center md:ml-6 gap-4">

                    {/* User Info & Logout */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-700">Admin</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <FiLogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
