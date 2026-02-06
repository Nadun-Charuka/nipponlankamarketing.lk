'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-white text-2xl font-display font-bold mb-6">
                            Nippon Lanka
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your trusted partner for premium electronics and home appliances in Sri Lanka. We offer the best prices, official warranties, and island-wide delivery.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <FaTiktok className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me/94777123456" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/products" className="hover:text-primary-400 transition-colors">All Products</Link></li>
                            <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Top Categories</h4>
                        <ul className="space-y-3">
                            <li><Link href="/category/televisions" className="hover:text-primary-400 transition-colors">Televisions</Link></li>
                            <li><Link href="/category/refrigerators" className="hover:text-primary-400 transition-colors">Refrigerators</Link></li>
                            <li><Link href="/category/washing-machines" className="hover:text-primary-400 transition-colors">Washing Machines</Link></li>
                            <li><Link href="/category/air-conditioners" className="hover:text-primary-400 transition-colors">Air Conditioners</Link></li>
                            <li><Link href="/category/kitchen" className="hover:text-primary-400 transition-colors">Kitchen Appliances</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-6 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                                <span>
                                    123, Galle Road,<br />
                                    Colombo 03, Sri Lanka
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiPhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a href="tel:+94777123456" className="hover:text-primary-400 transition-colors">
                                    +94 77 123 4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiMail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a href="mailto:info@nipponlanka.lk" className="hover:text-primary-400 transition-colors">
                                    info@nipponlanka.lk
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {currentYear} Nippon Lanka Marketing. All rights reserved.
                    </p>

                    {/* Payment Methods */}
                    <div className="flex gap-3">
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">VISA</div>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">MASTER</div>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">AMEX</div>
                        <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-800">CASH</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
