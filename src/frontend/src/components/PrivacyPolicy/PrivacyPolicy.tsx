import React from 'react';
import '../../style.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <div className="w-full max-w-4xl p-4 md:p-8">
                <a className="text-sm text-text-variant dark:text-darkmode-text-variant block mb-6">
                    Effective Date: August 2, 2024
                </a>
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
                <p className="mb-6">
                    This Privacy Policy explains how we collect, use, and protect your personal data.
                </p>

                <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

                <h3 className="text-2xl font-semibold mb-4">What are cookies?</h3>
                <p className="mb-6">
                    Cookies are small text files stored on your device when you visit our website.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Why do we use cookies?</h3>
                <p className="mb-4">We use cookies to:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2">Automatically log you in</li>
                    <li>Store your Theme preference</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Types of cookies</h3>
                <p className="mb-4">We use the following types of cookies:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2">Essential cookies: necessary for the proper functioning of our website</li>
                    <li>Non-essential cookies: used to store e.g. your Dark Mode preference</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Duration of cookies</h3>
                <p className="mb-6">
                    Our cookies have a limited duration and will expire after 2 weeks.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Managing your cookie consent</h3>
                <p className="mb-6">
                    You can manage your cookie preferences at any time by clicking on the "Manage Cookie" button in the footer of our website.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
