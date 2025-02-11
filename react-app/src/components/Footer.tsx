import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GitHubLogo, InstagramLogo, XLogo, YoutubeLogo } from "../icons/icons";
import Cookies from "js-cookie";
import DarkmodeButton from "./Darkmode";

const Footer = () => {
    const [showCookieConsent, setShowCookieConsent] = useState(false);

    const manageCookies = async () => {
        Cookies.remove("cookieConsent");
        window.location.reload();
    };

    return (
        <footer className="bg-secondary dark:bg-darkmode-background text-text dark:text-darkmode-text p-8 mt-auto w-full overscroll-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 justify-items-center items-start max-w-[62rem] mx-auto">
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Users</h1>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Support</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">FAQ</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Contact</li>
                </ul>
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Daily Dinner</h1>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Home</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Product</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Blog</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">About us</li>
                </ul>
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Resources</h1>
                    <li className="text-sm mb-4 cursor-pointer hover:underline hover:text-accent dark:hover:text-darkmode-accent" onClick={manageCookies}>Manage Cookies</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">Imprint</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">
                        <Link to="/tos">Terms of Services</Link>
                    </li>
                </ul>
                <ul className="list-none p-0 m-0 text-center">
                    <h1 className="text-lg font-bold mb-4">Social</h1>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">{XLogo()}</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">{InstagramLogo()}</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">{YoutubeLogo()}</li>
                    <li className="text-sm mb-4 hover:underline hover:text-accent dark:hover:text-darkmode-accent">{GitHubLogo()}</li>
                </ul>
            </div>
            <div className="flex justify-center mt-8">
                <DarkmodeButton />
            </div>
        </footer>
    );
};

export default Footer;