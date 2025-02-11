import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-background dark:bg-darkmode-background-variant-1 pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <div className="w-full max-w-4xl p-4 md:p-8">
                <a className="text-sm text-text-variant dark:text-darkmode-text-variant block mb-6">
                    Effective Date: February 10, 2025
                </a>
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
                <p className="mb-6">
                    This Privacy Policy explains how we collect, use, and protect your personal data when using our website.
                </p>

                <h1 className="text-3xl font-bold mb-6">Cookie & Storage Policy</h1>

                <h3 className="text-2xl font-semibold mb-4">What are cookies?</h3>
                <p className="mb-6">
                    Cookies are small text files stored on your device when you visit our website. They help us remember certain information about your session.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Why do we use cookies?</h3>
                <p className="mb-4">We use cookies strictly for the following purposes:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2">Managing user authentication and maintaining login sessions.</li>
                    <li>Improving website functionality and user experience.</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Types of cookies we use</h3>
                <p className="mb-4">We use the following types of cookies:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2"><strong>Essential cookies</strong>: Required for login functionality and security. These cannot be disabled.</li>
                    <li><strong>Local Storage (not a cookie)</strong>: Used to store your dark mode preference and other UI settings.</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Cookie Duration</h3>
                <p className="mb-6">
                    Our authentication cookies expire after 2 weeks. Local storage data remains until cleared manually by the user.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Managing Cookies & Storage</h3>
                <p className="mb-6">
                    Since we only use strictly necessary cookies, no consent banner is required. However, you can clear cookies and local storage in your browser settings at any time.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
