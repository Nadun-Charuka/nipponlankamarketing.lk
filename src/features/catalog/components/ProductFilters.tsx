'use client';

import { useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { FiX, FiMinus, FiPlus, FiFilter } from 'react-icons/fi';

export interface FilterState {
    category: string[];
    brand: string[];
    priceRange: { min: number | ''; max: number | '' };
    stock: string[];
}

interface ProductFiltersProps {
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
    activeFilters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

const filtersDef = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'televisions', label: 'Televisions' },
            { value: 'refrigerators', label: 'Refrigerators' },
            { value: 'washing-machines', label: 'Washing Machines' },
            { value: 'air-conditioners', label: 'Air Conditioners' },
            { value: 'kitchen', label: 'Kitchen Appliances' },
            { value: 'furniture', label: 'Furniture' },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'samsung', label: 'Samsung' },
            { value: 'lg', label: 'LG' },
            { value: 'abans', label: 'Abans' },
            { value: 'panasonic', label: 'Panasonic' },
            { value: 'sony', label: 'Sony' },
            { value: 'singer', label: 'Singer' },
            { value: 'damro', label: 'Damro' },
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
            { value: 'in_stock', label: 'In Stock' },
            { value: 'pre_order', label: 'Pre Order' },
        ],
    },
];

export function ProductFilters({ mobileFiltersOpen, setMobileFiltersOpen, activeFilters, onFilterChange, mode = 'both' }: ProductFiltersProps & { mode?: 'mobile' | 'desktop' | 'both' }) {

    const handleCheckboxChange = (sectionId: keyof FilterState, value: string, checked: boolean) => {
        const currentValues = activeFilters[sectionId] as string[];
        const newValues = checked
            ? [...currentValues, value]
            : currentValues.filter((v) => v !== value);

        onFilterChange({
            ...activeFilters,
            [sectionId]: newValues,
        });
    };

    const handlePriceChange = (min: number | '', max: number | '') => {
        onFilterChange({
            ...activeFilters,
            priceRange: { min, max },
        });
    };

    return (
        <>
            {/* Mobile filter dialog */}
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
                                            {filtersDef.map((section) => (
                                                <div key={section.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                                    <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">
                                                        {section.name}
                                                    </h3>

                                                    {section.type === 'range' ? (
                                                        <PriceRangeInputs
                                                            min={activeFilters.priceRange.min}
                                                            max={activeFilters.priceRange.max}
                                                            onChange={handlePriceChange}
                                                        />
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
                                                                            checked={(activeFilters[section.id as keyof FilterState] as string[]).includes(option.value)}
                                                                            onChange={(e) => handleCheckboxChange(section.id as keyof FilterState, option.value, e.target.checked)}
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
                                            Done
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
                        {filtersDef.map((section, sectionIdx) => (
                            <div key={section.id} className={sectionIdx === 0 ? '' : 'pt-10'}>
                                <fieldset>
                                    <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                    <div className="space-y-3 pt-6">
                                        {section.type === 'range' ? (
                                            <PriceRangeInputs
                                                min={activeFilters.priceRange.min}
                                                max={activeFilters.priceRange.max}
                                                onChange={handlePriceChange}
                                            />
                                        ) : (
                                            section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center">
                                                    <input
                                                        id={`filter-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        checked={(activeFilters[section.id as keyof FilterState] as string[]).includes(option.value)}
                                                        onChange={(e) => handleCheckboxChange(section.id as keyof FilterState, option.value, e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-600 cursor-pointer select-none"
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

function PriceRangeInputs({ min, max, onChange }: { min: number | '', max: number | '', onChange: (min: number | '', max: number | '') => void }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="min-price" className="sr-only">Min Price</label>
                <input
                    type="number"
                    id="min-price"
                    placeholder="Min"
                    value={min}
                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '', max)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
            </div>
            <div>
                <label htmlFor="max-price" className="sr-only">Max Price</label>
                <input
                    type="number"
                    id="max-price"
                    placeholder="Max"
                    value={max}
                    onChange={(e) => onChange(min, e.target.value ? Number(e.target.value) : '')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
            </div>
        </div>
    );
}
