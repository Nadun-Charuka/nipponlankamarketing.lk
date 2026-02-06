'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
    categoryId: string;
}

// Mock data - will be replaced with Supabase data later
const megaMenuData: Record<string, any> = {
    televisions: {
        columns: [
            {
                title: 'By Size',
                links: [
                    { label: '32" TVs', href: '/category/televisions/32-inch' },
                    { label: '43" TVs', href: '/category/televisions/43-inch' },
                    { label: '55" TVs', href: '/category/televisions/55-inch' },
                    { label: '65" TVs', href: '/category/televisions/65-inch' },
                    { label: '75" TVs', href: '/category/televisions/75-inch' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'Samsung', href: '/category/televisions/samsung' },
                    { label: 'LG', href: '/category/televisions/lg' },
                    { label: 'Sony', href: '/category/televisions/sony' },
                    { label: 'Panasonic', href: '/category/televisions/panasonic' },
                ],
            },
            {
                title: 'By Type',
                links: [
                    { label: '4K Ultra HD', href: '/category/televisions/4k' },
                    { label: 'Smart TV', href: '/category/televisions/smart' },
                    { label: 'OLED', href: '/category/televisions/oled' },
                    { label: 'QLED', href: '/category/televisions/qled' },
                ],
            },
        ],
    },
    refrigerators: {
        columns: [
            {
                title: 'By Type',
                links: [
                    { label: 'Single Door', href: '/category/refrigerators/single-door' },
                    { label: 'Double Door', href: '/category/refrigerators/double-door' },
                    { label: 'Side by Side', href: '/category/refrigerators/side-by-side' },
                    { label: 'French Door', href: '/category/refrigerators/french-door' },
                ],
            },
            {
                title: 'By Capacity',
                links: [
                    { label: 'Under 200L', href: '/category/refrigerators/under-200l' },
                    { label: '200L - 400L', href: '/category/refrigerators/200-400l' },
                    { label: '400L - 600L', href: '/category/refrigerators/400-600l' },
                    { label: 'Above 600L', href: '/category/refrigerators/above-600l' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'LG', href: '/category/refrigerators/lg' },
                    { label: 'Samsung', href: '/category/refrigerators/samsung' },
                    { label: 'Panasonic', href: '/category/refrigerators/panasonic' },
                ],
            },
        ],
    },
    'washing-machines': {
        columns: [
            {
                title: 'By Type',
                links: [
                    { label: 'Front Load', href: '/category/washing-machines/front-load' },
                    { label: 'Top Load', href: '/category/washing-machines/top-load' },
                    { label: 'Semi-Automatic', href: '/category/washing-machines/semi-automatic' },
                ],
            },
            {
                title: 'By Capacity',
                links: [
                    { label: '6kg', href: '/category/washing-machines/6kg' },
                    { label: '7kg', href: '/category/washing-machines/7kg' },
                    { label: '8kg', href: '/category/washing-machines/8kg' },
                    { label: '9kg+', href: '/category/washing-machines/9kg-plus' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'Abans', href: '/category/washing-machines/abans' },
                    { label: 'LG', href: '/category/washing-machines/lg' },
                    { label: 'Samsung', href: '/category/washing-machines/samsung' },
                ],
            },
        ],
    },
};

export function MegaMenu({ categoryId }: MegaMenuProps) {
    const menuData = megaMenuData[categoryId];

    if (!menuData) {
        return null;
    }

    return (
        <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-2xl rounded-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-6">
                <div className="grid grid-cols-3 gap-8">
                    {menuData.columns.map((column: any, index: number) => (
                        <div key={index}>
                            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                {column.title}
                            </h3>
                            <ul className="space-y-2">
                                {column.links.map((link: any, linkIndex: number) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-primary-600 transition-colors text-sm block py-1"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                        href={`/category/${categoryId}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-2"
                    >
                        View All {categoryId.replace('-', ' ')}
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
