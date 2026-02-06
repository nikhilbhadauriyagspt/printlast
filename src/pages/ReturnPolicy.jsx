// src/pages/ReturnPolicy.jsx

import React from 'react';

export default function ReturnPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Return Policy
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Last updated February 06, 2026
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-10 lg:p-12 border border-gray-200 dark:border-gray-800 prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic">
                    <p>
                        Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund only.
                    </p>

                    <p className="mt-6">
                        Please see below for more information on our return policy.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        RETURNS
                    </h2>

                    <p className="mt-6">
                        All returns must be postmarked within seven (7) days of the purchase date.
                    </p>

                    <p className="mt-4">
                        All returned items must be in new and unused condition, with all original tags and labels attached.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        RETURN PROCESS
                    </h2>

                    <p className="mt-6">
                        To return an item, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:
                    </p>

                    <div className="mt-4 pl-6 font-medium leading-relaxed">
                        PrintLast<br />
                        Attn: Returns<br />
                        8560 Florida Blvd,<br />
                        Baton Rouge, LA 70815<br />
                        United States
                    </div>

                    <p className="mt-6">
                        Return shipping charges will be paid or reimbursed by us.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        REFUNDS
                    </h2>

                    <p className="mt-6">
                        After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least seven (7) days from the receipt of your item to process your return.
                    </p>

                    <p className="mt-4">
                        Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company.
                    </p>

                    <p className="mt-4">
                        We will notify you by email when your return has been processed.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        EXCEPTIONS
                    </h2>

                    <p className="mt-6">
                        For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
                    </p>

                    <h2 className="mt-12 text-3xl border-b border-gray-200 dark:border-gray-700 pb-4">
                        QUESTIONS
                    </h2>

                    <p className="mt-6">
                        If you have any questions concerning our return policy, please contact us at:
                    </p>

                    <ul className="mt-4 list-disc pl-6 space-y-2 text-base">
                        <li>Phone: XXXXXXXXXX</li>
                        <li>Email: <a href="mailto:printlast@outlook.com">printlast@outlook.com</a></li>
                    </ul>

                </div>
            </div>
        </div>
    );
}