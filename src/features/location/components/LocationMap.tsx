'use client';

import { FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi';
import { GoogleMapEmbed } from './GoogleMapEmbed';

export function LocationMap() {
    // Nippon Lanka Marketing actual location
    const businessInfo = {
        name: 'Nippon Lanka Marketing',
        address: 'No 1/A Horahena Rd, Hokandara',
        city: 'Hokandara 10118',
        phone: '+94776199905',
        email: 'info@nipponlanka.lk',
        hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
        coordinates: {
            lat: 6.866823852953636,
            lng: 79.97346212354978
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Visit Our Store
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Come see our products in person. Our friendly staff is ready to help you find the perfect appliances for your home.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FiMapPin className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                                <p className="text-gray-600">{businessInfo.address}</p>
                                <p className="text-gray-600">{businessInfo.city}</p>
                                <p className="text-sm text-gray-500 mt-1">Sri Lanka</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FiPhone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                <a
                                    href={`tel:${businessInfo.phone}`}
                                    className="text-gray-600 hover:text-primary-600 transition-colors"
                                >
                                    {businessInfo.phone}
                                </a>
                                <p className="text-sm text-gray-500 mt-1">WhatsApp available</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FiMail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                <a
                                    href={`mailto:${businessInfo.email}`}
                                    className="text-gray-600 hover:text-primary-600 transition-colors"
                                >
                                    {businessInfo.email}
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FiClock className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                                <p className="text-gray-600">{businessInfo.hours}</p>
                                <p className="text-sm text-gray-500 mt-1">Closed on Sundays</p>
                            </div>
                        </div>

                        {/* Get Directions Button */}
                        <div className="pt-4">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-xl"
                            >
                                <FiMapPin className="w-5 h-5" />
                                Get Directions
                            </a>
                        </div>
                    </div>

                    {/* Google Map Embed with Error Handling */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[500px] relative">
                        <GoogleMapEmbed className="h-full w-full" />
                    </div>
                </div>

                {/* Service Area Notice */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-6 py-3 rounded-full">
                        <FiMapPin className="w-5 h-5" />
                        <span className="font-medium">
                            Free Delivery Available in Colombo, Gampaha & Kalutara
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
