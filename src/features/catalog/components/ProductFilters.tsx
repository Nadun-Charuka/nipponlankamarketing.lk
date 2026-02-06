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

export function ProductFilters({ mobileFiltersOpen, setMobileFiltersOpen }: ProductFiltersProps) {
    return (
        <>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as="div">
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as="div"
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as="div"
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <FiX className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Mobile Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <FiMinus className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <FiPlus className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.type === 'range' ? (
                                                                <PriceRangeInputs />
                                                            ) : (
                                                                section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop Filters */}
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
