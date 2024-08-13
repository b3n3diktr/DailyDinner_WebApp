import React from 'react';
import '../../style.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <div
            className="bg-base-variant dark:bg-darkmode-base-variant mt-[20vh] pt-20 pb-0 px-0 min-h-[90vh] flex flex-col items-center rounded-t-xl md:pb-0 md:px-4 text-text dark:text-darkmode-text">
            <div className="wrapper-pp">
                <a> Effective Date: August 2. 2024 </a>
                <h1>Privacy Policy</h1>

                <h3>Introduction</h3>
                <p>This Privacy Policy explains how we collect, use, and protect your personal data.</p>

                <h1>Cookie Policy</h1>
                <h3>What are cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit our website.</p>

                <h3>Why do we use cookies?</h3>
                <p>We use cookies to:</p>
                <ul>
                    <li>1. Automatically log you in</li>
                    <li>2. Store your Theme preference</li>
                </ul>

                <h3>Types of cookies</h3>
                <p>We use the following types of cookies:</p>
                <ul>
                    <li>1. Essential cookies: necessary for the proper functioning of our website</li>
                    <li>2. Non-essential cookies: used to store e.g. your Dark Mode preference</li>
                </ul>

                <h3>Duration of cookies</h3>
                <p>Our cookies have a limited duration and will expire after 2 weeks.</p>

                <h3>Managing your cookie consent</h3>
                <p>You can manage your cookie preferences at any time by clicking on the "Manage Cookie" button in the
                    footer of our website.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;