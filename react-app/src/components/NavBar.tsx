import React, { useEffect, useRef, useState } from "react";
import { Close, HamMenu } from "../icons/icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLUListElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);

    useEffect(() => {
        const loggedIn = Cookies.get('loggedIn');

        if (loggedIn == "true") {
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
        <div className="min-h-12 flex flex-col font-bold text-text dark:text-darkmode-text fill-text dark:fill-darkmode-text">
            <nav className="fixed top-0 left-0 w-full bg-background dark:bg-darkmode-background shadow-md z-50">

                {/* Sidebar */}
                <ul
                    ref={sidebarRef}
                    className={`rounded-lg fixed top-0 right-0 h-vh-100 w-auto max-w-xs [@media(min-width:28rem)]:w-sidebar z-50 bg-background-variant-1 dark:bg-darkmode-background-variant-1 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} flex flex-col items-start justify-start`}
                >
                    <li onClick={hideSidebar} className="p-4 cursor-pointer fill-current text-text dark:text-darkmode-text">
                        <Close />
                    </li>
                    {isLoggedIn ? (
                        <li className="p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                            <Link to="/recipes">Recipes</Link>
                        </li>
                    ) : null}
                    <li className="p-4 hover:bg-background-variant-2 dark:hover:bg-darkmode-background">
                        <Link onClick={hideSidebar} to="/blog">Blog</Link>
                    </li>
                    <li className="p-4 hover:bg-background-variant-2 dark:hover:bg-darkmode-background">
                        <Link onClick={hideSidebar} to="/about">About</Link>
                    </li>
                    <li className="p-4 hover:bg-background-variant-2 dark:hover:bg-darkmode-background">
                        <Link onClick={hideSidebar} to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="p-4 hover:bg-background-variant-2 dark:hover:bg-darkmode-background">
                            <Link onClick={hideSidebar} to="/myaccount#dashboard">Dashboard</Link>
                        </li>
                    ) : (
                        <li className="p-4 hover:bg-background-variant-2 dark:hover:bg-darkmode-background">
                            <Link onClick={hideSidebar} to="/signin">Sign in</Link>
                        </li>
                    )}
                </ul>

                {/* Normal NavBar */}
                <ul className="flex justify-end items-center w-full list-none ">
                    <li className="mr-auto p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                        <Link to="/home">Daily Dinner</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="hidden md:block p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                            <Link to="/recipes">Recipes</Link>
                        </li>
                    ) : null}
                    <li className="hidden md:block p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="hidden md:block p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="hidden md:block p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="hidden md:block p-4 fill-text dark:fill-darkmode-text hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                            <Link to="/myaccount#dashboard">Dashboard</Link>
                        </li>
                    ) : (
                        <li className="hidden md:block p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                            <Link to="/signin">Sign in</Link>
                        </li>
                    )}
                    <li className="md:hidden p-4 hover:bg-background-variant-2 hover:dark:bg-darkmode-background-variant-2">
                        <a onClick={showSidebar}>
                            {HamMenu()}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>


    );
};

export default NavBar;
