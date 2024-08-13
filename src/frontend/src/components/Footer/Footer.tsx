import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GitHubLogo, InstagramLogo, XLogo, YoutubeLogo } from "../../icons/icons";
import Cookies from "js-cookie";

const Footer = () => {
    const [showCookieConsent, setShowCookieConsent] = useState(false);

    const manageCookies = async () => {
        Cookies.remove("cookieConsent");
        window.location.reload();
    };

    return (
        <footer className="bg-base dark:bg-darkmode-base text-text-variant dark:text-darkmode-text-variant p-8 mt-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 justify-items-center items-start max-w-[62rem] mx-auto">
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Users</h1>
                    <li className="text-sm mb-4 hover:underline">Support</li>
                    <li className="text-sm mb-4 hover:underline">FAQ</li>
                    <li className="text-sm mb-4 hover:underline">Contact</li>
                </ul>
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Daily Dinner</h1>
                    <li className="text-sm mb-4 hover:underline">Home</li>
                    <li className="text-sm mb-4 hover:underline">Product</li>
                    <li className="text-sm mb-4 hover:underline">Blog</li>
                    <li className="text-sm mb-4 hover:underline">About us</li>
                </ul>
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Resources</h1>
                    <li className="text-sm mb-4 cursor-pointer hover:underline" onClick={manageCookies}>Manage Cookies</li>
                    <li className="text-sm mb-4 hover:underline">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="text-sm mb-4 hover:underline">Imprint</li>
                    <li className="text-sm mb-4 hover:underline">
                        <Link to="/tos">Terms of Services</Link>
                    </li>
                </ul>
                <ul className="list-none p-0 m-0 fill-text-variant dark:fill-darkmode-text-variant text-center">
                    <h1 className="text-lg font-bold mb-4">Social</h1>
                    <li className="text-sm mb-4 hover:underline">{XLogo()}</li>
                    <li className="text-sm mb-4 hover:underline">{InstagramLogo()}</li>
                    <li className="text-sm mb-4 hover:underline">{YoutubeLogo()}</li>
                    <li className="text-sm mb-4 hover:underline">{GitHubLogo()}</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
