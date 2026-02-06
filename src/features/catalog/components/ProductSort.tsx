'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

const sortOptions = [
    { name: 'Most Popular', value: 'popular' },
    { name: 'Best Rating', value: 'rating' },
    { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price_asc' },
    { name: 'Price: High to Low', value: 'price_desc' },
];

interface ProductSortProps {
    onSortChange?: (sortValue: string) => void;
}

export function ProductSort({ onSortChange }: ProductSortProps = {}) {
    const [selected, setSelected] = useState(sortOptions[0]);

    const handleChange = (option: typeof sortOptions[0]) => {
        setSelected(option);
        onSortChange?.(option.value);
    };

    return (
        <div className="w-full lg:w-56">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 lg:bg-white py-2.5 lg:py-2 pl-3 pr-10 text-left shadow-sm lg:shadow-md focus:outline-none focus:visible:border-indigo-500 focus:visible:ring-2 focus:visible:ring-white/75 sm:text-sm border border-gray-200">
                        <span className="block truncate text-sm font-medium text-gray-700">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown
                                className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-30">
                            {sortOptions.map((option, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                                    <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
