'use client';

import { GoogleMapEmbed } from '@/features/location/components';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp, FaHeadset } from 'react-icons/fa';
import { FaPerson, FaPersonBiking } from 'react-icons/fa6';

export default function ContactPage() {
    const contactList = [
        {
            title: "Customer Care / WhatsApp",
            name: "Hotline (24/7)",
            number: "+94 72 372 8550",
            icon: <FaHeadset className="w-5 h-5" />,
            color: "text-purple-600",
            bg: "bg-purple-100",
            link: "https://wa.me/94723728550"
        },
        {
            title: "Office",
            name: "Main Office",
            number: "+94 11 2xx xxxx", // Placeholder
            icon: <FiPhone className="w-5 h-5" />,
            color: "text-blue-600",
            bg: "bg-blue-100",
            link: "tel:+94112xxxxxx"
        },
        {
            title: "Delivery Driver",
            name: "Chathuranga",
            number: "+94 7x xxx xxxx", // Placeholder
            icon: <FiPhone className="w-5 h-5" />,
            color: "text-pink-600",
            bg: "bg-pink-100",
            link: "tel:+947xxxxxxx"
        },
        {
            title: "Delivery Driver",
            name: "Asitha",
            number: "+94 7x xxx xxxx", // Placeholder
            icon: <FiPhone className="w-5 h-5" />,
            color: "text-pink-600",
            bg: "bg-pink-100",
            link: "tel:+947xxxxxxx"
        },
        {
            title: "Delivery Driver",
            name: "Danushka",
            number: "+94 7x xxx xxxx", // Placeholder
            icon: <FiPhone className="w-5 h-5" />,
            color: "text-pink-600",
            bg: "bg-pink-100",
            link: "tel:+947xxxxxxx"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20 pb-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 relative inline-block">
                        Contact Us
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70"></span>
                    </h1>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-purple-100 inline-block">
                        <p className="flex items-center gap-2 text-purple-700 font-medium justify-center">
                            <FaHeadset className="animate-pulse" />
                            24/7 Customer Support available via WhatsApp & Calls
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    {/* Left Column: Information (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Location & Hours Card */}
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <FiMapPin className="w-5 h-5" />
                                </span>
                                Visit Our Store
                            </h2>

                            <address className="not-italic text-gray-600 pl-14 mb-8 relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                                <p className="font-bold text-gray-900 text-lg mb-1">Nippon Lanka Marketing</p>
                                <p>No 1/A Horahena Rd,</p>
                                <p>Hokandara, Sri Lanka</p>
                            </address>

                            <div className="pl-14 relative">
                                <div className="absolute -left-3 top-0 w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                                    <FiClock className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Opening Hours</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex justify-between">
                                        <span className="w-24">Monday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex justify-between text-red-500 bg-red-50 px-2 py-0.5 rounded-md -mx-2">
                                        <span className="w-24 font-medium">Tuesday</span>
                                        <span className="font-bold">CLOSED</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="w-24">Wednesday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="w-24">Thursday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="w-24">Friday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="w-24">Saturday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="w-24">Sunday</span>
                                        <span className="font-medium text-gray-900">8:00 AM - 5:00 PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contacts Card */}
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <FiPhone className="w-5 h-5" />
                                </span>
                                Direct Contacts
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {contactList.map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.link}
                                        className="flex flex-col p-4 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group"
                                    >
                                        <div className={`w-10 h-10 rounded-full ${contact.bg} ${contact.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                            {contact.icon}
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                            {contact.title}
                                        </p>
                                        <p className="font-medium text-gray-900 mb-0.5 group-hover:text-purple-600 transition-colors">
                                            {contact.name}
                                        </p>
                                        <p className="text-sm font-bold text-gray-700">
                                            {contact.number}
                                        </p>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <a href="mailto:info@nipponlanka.lk" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <FiMail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase">Email Us</p>
                                        <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">info@nipponlanka.lk</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Map (7 cols) */}
                    <div className="lg:col-span-7 h-full min-h-[500px] lg:min-h-0">
                        <div className="bg-white/70 backdrop-blur-md p-2 rounded-3xl shadow-lg border border-white/50 h-full relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                            <GoogleMapEmbed className="w-full h-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
