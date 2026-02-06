'use client';

import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
    categoryId: string;
}

// Mock data - These subcategory links are placeholders
// In a real implementation, these would filter products on the category page
const megaMenuData: Record<string, any> = {
    televisions: {
        columns: [
            {
                title: 'By Size',
                links: [
                    { label: '32" TVs', href: '/category/televisions' },
                    { label: '43" TVs', href: '/category/televisions' },
                    { label: '55" TVs', href: '/category/televisions' },
                    { label: '65" TVs', href: '/category/televisions' },
                    { label: '75" TVs', href: '/category/televisions' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'Samsung', href: '/category/televisions' },
                    { label: 'LG', href: '/category/televisions' },
                    { label: 'Sony', href: '/category/televisions' },
                    { label: 'Panasonic', href: '/category/televisions' },
                ],
            },
            {
                title: 'By Type',
                links: [
                    { label: '4K Ultra HD', href: '/category/televisions' },
                    { label: 'Smart TV', href: '/category/televisions' },
                    { label: 'OLED', href: '/category/televisions' },
                    { label: 'QLED', href: '/category/televisions' },
                ],
            },
        ],
    },
    refrigerators: {
        columns: [
            {
                title: 'By Type',
                links: [
                    { label: 'Single Door', href: '/category/refrigerators' },
                    { label: 'Double Door', href: '/category/refrigerators' },
                    { label: 'Side by Side', href: '/category/refrigerators' },
                    { label: 'French Door', href: '/category/refrigerators' },
                ],
            },
            {
                title: 'By Capacity',
                links: [
                    { label: 'Under 200L', href: '/category/refrigerators' },
                    { label: '200L - 400L', href: '/category/refrigerators' },
                    { label: '400L - 600L', href: '/category/refrigerators' },
                    { label: 'Above 600L', href: '/category/refrigerators' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'LG', href: '/category/refrigerators' },
                    { label: 'Samsung', href: '/category/refrigerators' },
                    { label: 'Panasonic', href: '/category/refrigerators' },
                ],
            },
        ],
    },
    'washing-machines': {
        columns: [
            {
                title: 'By Type',
                links: [
                    { label: 'Front Load', href: '/category/washing-machines' },
                    { label: 'Top Load', href: '/category/washing-machines' },
                    { label: 'Semi-Automatic', href: '/category/washing-machines' },
                ],
            },
            {
                title: 'By Capacity',
                links: [
                    { label: '6kg', href: '/category/washing-machines' },
                    { label: '7kg', href: '/category/washing-machines' },
                    { label: '8kg', href: '/category/washing-machines' },
                    { label: '9kg+', href: '/category/washing-machines' },
                ],
            },
            {
                title: 'By Brand',
                links: [
                    { label: 'Abans', href: '/category/washing-machines' },
                    { label: 'LG', href: '/category/washing-machines' },
                    { label: 'Samsung', href: '/category/washing-machines' },
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
                        View All {categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
