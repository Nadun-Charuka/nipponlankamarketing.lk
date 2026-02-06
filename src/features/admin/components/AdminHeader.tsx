'use client';

import { FiBell, FiSearch, FiMenu } from 'react-icons/fi';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
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
            <div className="flex items-center justify-between flex-1">
                {/* Search (Optional) */}
                <div className="flex-1 max-w-lg min-w-0">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-0 sm:text-sm transition-colors"
                            placeholder="Global Search"
                        />
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="ml-4 flex items-center md:ml-6 gap-4">
                    <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
                        <span className="sr-only">View notifications</span>
                        <FiBell className="h-6 w-6" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </button>
                </div>
            </div>
        </header>
    );
}
