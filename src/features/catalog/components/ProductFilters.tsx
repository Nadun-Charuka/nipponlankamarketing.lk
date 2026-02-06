'use client';

import { useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { FiX, FiMinus, FiPlus, FiFilter } from 'react-icons/fi';

interface ProductFiltersProps {
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'televisions', label: 'Televisions', checked: false },
            { value: 'refrigerators', label: 'Refrigerators', checked: false },
            { value: 'washing-machines', label: 'Washing Machines', checked: false },
            { value: 'air-conditioners', label: 'Air Conditioners', checked: false },
            { value: 'kitchen', label: 'Kitchen Appliances', checked: false },
            { value: 'furniture', label: 'Furniture', checked: false },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'samsung', label: 'Samsung', checked: false },
            { value: 'lg', label: 'LG', checked: false },
            { value: 'abans', label: 'Abans', checked: false },
            { value: 'panasonic', label: 'Panasonic', checked: false },
            { value: 'sony', label: 'Sony', checked: false },
            { value: 'singer', label: 'Singer', checked: false },
        ],
    },
    {
        id: 'price',
        name: 'Price Range',
        type: 'range',
        options: [],
    },
    {
        id: 'stock',
        name: 'Availability',
        options: [
            { value: 'in_stock', label: 'In Stock', checked: true },
            { value: 'pre_order', label: 'Pre Order', checked: false },
        ],
    },
];

export function ProductFilters({ mobileFiltersOpen, setMobileFiltersOpen, mode = 'both' }: ProductFiltersProps & { mode?: 'mobile' | 'desktop' | 'both' }) {
    return (
        <>
            {/* Mobile filter dialog */}
            {/* Mobile filter dialog (Bottom Sheet) */}
            {(mode === 'mobile' || mode === 'both') && (
                <Transition.Root show={mobileFiltersOpen} as="div">
                    <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as="div"
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
                            <Transition.Child
                                as="div"
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-y-full"
                                enterTo="translate-y-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-y-0"
                                leaveTo="translate-y-full"
                                className="w-full sm:max-w-md"
                            >
                                <Dialog.Panel className="relative w-full flex flex-col max-h-[90vh] overflow-hidden bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl">
                                    {/* Handle Bar */}
                                    <div className="h-1.5 w-12 bg-gray-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                        <h2 className="text-xl font-display font-semibold text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="p-2 -mr-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <FiX className="h-6 w-6" />
                                        </button>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4">
                                        <form className="space-y-6">
                                            {filters.map((section) => (
                                                <div key={section.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                    <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">
                                                        {section.name}
                                                    </h3>

                                                    {section.type === 'range' ? (
                                                        <PriceRangeInputs />
                                                    ) : (
                                                        <div className="space-y-3">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center group">
                                                                    <div className="relative flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                                                        />
                                                                    </div>
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-base text-gray-600 group-hover:text-gray-900 cursor-pointer select-none"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </form>
                                    </div>

                                    {/* Sticky Footer */}
                                    <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex gap-4">
                                        <button
                                            type="button"
                                            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-[2] px-4 py-3 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            Show Results
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}

            {/* Desktop Filters */}
            {(mode === 'desktop' || mode === 'both') && (
                <div className="hidden lg:block">
                    <form className="space-y-10 divide-y divide-gray-200">
                        {filters.map((section, sectionIdx) => (
                            <div key={section.id} className={sectionIdx === 0 ? '' : 'pt-10'}>
                                <fieldset>
                                    <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                    <div className="space-y-3 pt-6">
                                        {section.type === 'range' ? (
                                            <PriceRangeInputs />
                                        ) : (
                                            section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center">
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        defaultChecked={option.checked}
                                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-600"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </fieldset>
                            </div>
                        ))}
                    </form>
                </div>
            )}
        </>
    );
}

function PriceRangeInputs() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="min-price" className="sr-only">Min Price</label>
                <input
                    type="number"
                    id="min-price"
                    placeholder="Min"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
            </div>
            <div>
                <label htmlFor="max-price" className="sr-only">Max Price</label>
                <input
                    type="number"
                    id="max-price"
                    placeholder="Max"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
            </div>
            <button className="col-span-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded transition-colors">
                Apply Range
            </button>
        </div>
    );
}
