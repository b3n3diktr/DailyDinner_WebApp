import React, { useEffect, useRef, useState } from "react";
import { AccountIcon, Close, HamMenu } from "../../icons/icons";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ToS from "../ToS/ToS";
import ResetPassword from "../User/ResetPassword";
import ForgotPassword from "../User/ForgotPassword";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import MyAccount from "../User/MyAccount";
import Home from "../Home/Home";
import SignIn from "../User/SignIn";
import Register from "../User/Register";
import FallbackPage from "../User/FallbackPage";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Blog from "../Blog/Blog";
import NotFound from "../NotFound/NotFound";
import Cookies from "js-cookie";

const NavBar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLUListElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);

    useEffect(() => {
        const token = Cookies.get('sessionID');
        if (token) {
            setIsLoggedIn(true);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                hideSidebar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-16 flex flex-col font-bold text-text dark:text-darkmode-text fill-text dark:fill-darkmode-text">
            <nav className="fixed top-0 left-0 w-full bg-base dark:bg-darkmode-base shadow-md z-50">
                <ul
                    ref={sidebarRef}
                    className={`fixed top-0 right-0 h-vh-100 w-full [@media(min-width:28rem)]:w-sidebar z-50 bg-base-variant dark:bg-darkmode-base-variant backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} flex flex-col items-start justify-start`}
                >
                    <li onClick={hideSidebar} className="p-4 cursor-pointer fill-current text-text dark:text-darkmode-text">
                        <Close/>
                    </li>
                    <li className="p-4 hover:bg-base-variant dark:hover:bg-darkmode-base">
                        <Link onClick={hideSidebar} to="/blog">Blog</Link>
                    </li>
                    <li className="p-4 hover:bg-base-variant dark:hover:bg-darkmode-base">
                        <Link onClick={hideSidebar} to="/about">About</Link>
                    </li>
                    <li className="p-4 hover:bg-base-variant dark:hover:bg-darkmode-base">
                        <Link onClick={hideSidebar} to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="p-4 hover:bg-base-variant dark:hover:bg-darkmode-base">
                            <Link onClick={hideSidebar} to="/myaccount#dashboard">Dashbaord</Link>
                        </li>
                    ) : (
                        <li className="p-4 hover:bg-base-variant dark:hover:bg-darkmode-base">
                            <Link onClick={hideSidebar} to="/signin">Sign in</Link>
                        </li>
                    )}
                </ul>
                <ul className="flex justify-end items-center w-full list-none">
                    <li className="mr-auto p-4">
                        <Link to="/home">Daily Dinner</Link>
                    </li>
                    <li className="hidden md:block p-4">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="hidden md:block p-4">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="hidden md:block p-4">
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="hidden md:block p-4 fill-text dark:fill-darkmode-text">
                            <Link to="/myaccount#dashboard">Dashboard</Link>
                        </li>
                    ) : (
                        <li className="hidden md:block p-4">
                            <Link to="/signin">Sign in</Link>
                        </li>
                    )}
                    <li className="md:hidden p-4">
                        <a onClick={showSidebar}>
                            {HamMenu()}
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="mt-14">
                <Routes>
                    <Route path="/tos" element={<ToS />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/myaccount" element={<MyAccount />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/fallback" element={<FallbackPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default NavBar;
