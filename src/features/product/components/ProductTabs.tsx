'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/shared/lib/utils';
import { Product } from '@/shared/types/database';

interface ProductTabsProps {
    description: string;
    specifications: Record<string, string>;
}

export function ProductTabs({ description, specifications }: ProductTabsProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="w-full">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex space-x-1 rounded-xl bg-gray-50 p-1 w-full">
                    <Tab
                        className={({ selected }) =>
                            cn(
                                'w-full rounded-lg py-2 text-sm font-medium leading-5 transition-all',
                                'ring-white/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white text-primary-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                            )
                        }
                    >
                        Description
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            cn(
                                'w-full rounded-lg py-2 text-sm font-medium leading-5 transition-all',
                                'ring-white/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white text-primary-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                            )
                        }
                    >
                        Specifications
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-4">
                    {/* Description Panel */}
                    <Tab.Panel
                        className={cn(
                            'rounded-xl bg-white focus:outline-none'
                        )}
                    >
                        <div className="prose prose-sm prose-purple max-w-none text-gray-600 leading-relaxed">
                            <p className="mb-2">{description}</p>
                            <p className="mb-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <ul className="my-2">
                                <li>Premium build quality</li>
                                <li>Energy efficient operation</li>
                                <li>Smart features included</li>
                                <li>2 Year Comprehensive Warranty</li>
                            </ul>
                        </div>
                    </Tab.Panel>

                    {/* Specifications Panel */}
                    <Tab.Panel
                        className={cn(
                            'rounded-xl bg-white focus:outline-none'
                        )}
                    >
                        <div className="border border-gray-100 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-100">
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {Object.entries(specifications).map(([key, value], idx) => (
                                        <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                                            <td className="px-4 py-2 whitespace-nowrap text-xs font-semibold text-gray-700 w-1/3">
                                                {key}
                                            </td>
                                            <td className="px-4 py-2 text-xs text-gray-600">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
