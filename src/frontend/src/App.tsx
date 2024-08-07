import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/User/Register';
import Login from './components/User/Login';
import FallbackPage from "./components/User/FallbackPage";
import Contact from "./components/Contact/Contact";
import './style.css';
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";
import {handleThemeSwitch} from "./components/Darkmode/Darkmode";
import { HamMenu, Close , XLogo, InstagramLogo, YoutubeLogo, GitHubLogo, LightMode, DarkMode, AccountIcon} from "./icons/icons";
import Cookies from 'js-cookie';
import Home from "./components/Home/Home";
import MyAccount from "./components/User/MyAccount";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import ToS from "./components/ToS/ToS";
import NotFound from "./components/NotFound/NotFound";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLUListElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCookieConsent, setShowCookieConsent] = useState(false);

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

    const manageCookies = async () =>{
        Cookies.remove("cookieConsent");
        window.location.reload();
    }

    return (
        <Router>
            <div>
                <button id="theme-switch" onClick={handleThemeSwitch}>
                    {DarkMode()}
                    {LightMode()}
                </button>
            </div>
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
                    <Route path="/reset-password" element={<ResetPassword />}/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/myaccount" element={<MyAccount/>} />
                    <Route path="/" element={<Navigate to="/home" />} />
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
            <footer className="footer">
                <ul>
                    <h1>Users</h1>
                    <li>Support</li>
                    <li>FAQ</li>
                    <li>Contact</li>
                </ul>
                <ul>
                    <h1>Daily Dinner</h1>
                    <li>Home</li>
                    <li>Product</li>
                    <li>Blog</li>
                    <li>About us</li>
                </ul>
                <ul>
                    <h1>Resources</h1>
                    <li onClick={manageCookies}>Manage Cookies</li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li>Imprint</li>
                    <li><Link to="/tos">Terms of Services</Link></li>
                </ul>
                <ul>
                    <h1>Social</h1>
                    <li>{XLogo()}</li>
                    <li>{InstagramLogo()}</li>
                    <li>{YoutubeLogo()}</li>
                    <li>{GitHubLogo()}</li>
                </ul>
            </footer>
            <div className="copyright">
                <p>© Benedikt Reich. All right reserved.</p>
            </div>
            <CookieConsent />
        </Router>
    );
};

export default App;
