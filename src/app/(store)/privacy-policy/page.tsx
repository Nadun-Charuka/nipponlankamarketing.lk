import React from 'react';
import { FiFileText, FiShield, FiInfo, FiCheckCircle, FiHome, FiFile, FiHelpCircle } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 relative inline-block">
                        Privacy Policy & Rules
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70"></span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Clear rules. Simple processes. Trustworthy service.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* General Privacy Section - Simplified Slogan */}
                    <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                            <FiShield className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Privacy, Our Priority</h2>
                        <p className="text-xl text-gray-700 font-medium">
                            "We collect only what's needed to deliver your order. <br className="hidden md:block" /> No selling data. No spam. Just secure service."
                        </p>
                    </section>

                    {/* Installment Rules Section */}
                    <section className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-sm">
                            Important Rule
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                                <FiFileText className="w-5 h-5" />
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900">Installment Plan Rules</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Max Purchase Limit with Sinhala Emphasis */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                    <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">1</span>
                                    Maximum Purchase Limit
                                </h3>

                                <div className="space-y-4">
                                    <p className="text-gray-800 text-lg">
                                        Per National Identity Card (NIC), you can purchase a maximum of <span className="font-bold text-red-600 underline">2 products</span> on installments.
                                    </p>

                                    {/* Sinhala Text */}
                                    <div className="bg-white/60 p-4 rounded-xl border border-red-100">
                                        <p className="text-xl font-bold text-red-700 leading-relaxed text-center font-sinhala">
                                            "වාරික පදනම යටතේ එක් ජාතික හැඳුනුම්පතකට (NIC) ලබා ගත හැක්කේ භාණ්ඩ 2ක් පමණි."
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <FiInfo className="text-blue-500" />
                                        Note: There is no limit for full cash purchases.
                                    </p>
                                </div>
                            </div>

                            {/* Eligibility */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs flex items-center justify-center">2</span>
                                    Eligibility & Verification
                                </h3>
                                <p className="text-gray-600">
                                    To qualify, please provide the following documents based on your residency status:
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Document Requirements Section */}
                    <section className="grid md:grid-cols-2 gap-6">
                        {/* Permanent Residents */}
                        <div className="bg-gradient-to-b from-white to-green-50/30 p-8 rounded-3xl border border-green-100 hover:border-green-300 transition-colors shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                                    <FiHome className="w-6 h-6" />
                                </span>
                                Permanent Residents
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                    National Identity Card (NIC)
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                    Utility Bill (Water or Electricity)
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                                    Proof of Billing Address
                                </li>
                            </ul>
                        </div>

                        {/* Rental / Temporary Residents */}
                        <div className="bg-gradient-to-b from-white to-orange-50/30 p-8 rounded-3xl border border-orange-100 hover:border-orange-300 transition-colors shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                                    <FiFile className="w-6 h-6" />
                                </span>
                                Rental / Temporary
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                                    National Identity Card (NIC)
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                                    <strong>Rent Agreement Document</strong>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                    <FiCheckCircle className="text-orange-500 flex-shrink-0" />
                                    Utility Bill (Water or Electricity)
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-100 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-blue-500 mb-4 shadow-sm">
                            <FiHelpCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Need more information?</h3>
                        <p className="text-gray-600 mb-4">
                            Our support team is available 24/7 to answer your questions about installment plans.
                        </p>
                        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 border border-blue-100 transition-colors shadow-sm hover:shadow-md">
                            Contact Customer Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
