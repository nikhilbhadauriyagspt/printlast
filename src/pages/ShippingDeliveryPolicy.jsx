// src/pages/ShippingDeliveryPolicy.jsx

import React from 'react';

export default function ShippingDeliveryPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Shipping & Delivery Policy
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Last updated February 06, 2026
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-10 lg:p-12 border border-gray-200 dark:border-gray-800 prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic">
                    <p>
                        This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <a href="https://printlast.shop/terms" target="_blank" rel="noopener noreferrer">https://printlast.shop/terms</a>.
                    </p>

                    <p className="mt-6">
                        Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        WHAT ARE MY SHIPPING DELIVERY OPTIONS?
                    </h2>

                    <p className="mt-6">
                        We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
                    </p>

                    <h3 className="mt-8">Free Shipping</h3>
                    <p className="mt-4">
                        We offer free Standard shipping on all orders.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        DO YOU DELIVER INTERNATIONALLY?
                    </h2>

                    <p className="mt-6">
                        We do not offer international shipping.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        WHAT HAPPENS IF MY ORDER IS DELAYED?
                    </h2>

                    <p className="mt-6">
                        If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        QUESTIONS ABOUT RETURNS?
                    </h2>

                    <p className="mt-6">
                        If you have questions about returns, please review our Return Policy: <a href="https://inkifyinfo.com/return-policy" target="_blank" rel="noopener noreferrer">https://inkifyinfo.com/return-policy</a>.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                    </h2>

                    <p className="mt-6">
                        If you have any further questions or comments, you may contact us by:
                    </p>

                    <ul className="mt-4 list-disc pl-6 space-y-2 text-base">
                        <li>Phone: 0000000000</li>
                        <li>Email: <a href="mailto:printlast@outlook.com">printlast@outlook.com</a></li>
                    </ul>


                </div>
            </div>
        </div>
    );
}