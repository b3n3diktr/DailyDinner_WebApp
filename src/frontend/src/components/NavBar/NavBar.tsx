import React, {useEffect, useRef, useState} from "react";
import {AccountIcon, Close, HamMenu} from "../../icons/icons";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import ToS from "../ToS/ToS";
import ResetPassword from "../User/ResetPassword";
import ForgotPassword from "../User/ForgotPassword";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import MyAccount from "../User/MyAccount";
import Home from "../Home/Home";
import Login from "../User/Login";
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
        <div className="wrapper">
            <nav>
                <ul ref={sidebarRef} className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                    <li onClick={hideSidebar}>{Close()}</li>
                    <li><Link onClick={hideSidebar} to={"/blog"}>Blog</Link></li>
                    <li><Link onClick={hideSidebar} to={"/about"}>About</Link></li>
                    <li><Link onClick={hideSidebar} to={"/contact"}>Contact</Link></li>
                    {isLoggedIn ? (
                        <li><Link onClick={hideSidebar} to={"/myaccount"}>{AccountIcon()}</Link></li>
                    ) : (
                        <li><Link onClick={hideSidebar} to={"/login"}>Login</Link></li>
                    )}
                </ul>
                <ul>
                    <li><Link to={"/home"}>Daily Dinner</Link></li>
                    <li className={"hideOnMobile"}><Link to={"/blog"}>Blog</Link></li>
                    <li className={"hideOnMobile"}><Link to={"/about"}>About</Link></li>
                    <li className={"hideOnMobile"}><Link to={"/contact"}>Contact</Link></li>
                    {isLoggedIn ? (
                        <li className={"hideOnMobile"}><Link to={"/myaccount"}>{AccountIcon()}</Link></li>
                    ) : (
                        <li className={"hideOnMobile"}><Link to={"/login"}>Login</Link></li>
                    )}
                    <li className={"menu-button"}>
                        <a onClick={showSidebar}>
                            {HamMenu()}
                        </a>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/tos" element={<ToS/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/myaccount" element={<MyAccount/>}/>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/fallback" element={<FallbackPage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/fallback" element={<FallbackPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default NavBar;