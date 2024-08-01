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
import { HamMenu, Close , XLogo, InstagramLogo, YoutubeLogo, GitHubLogo, LightMode, DarkMode} from "./icons/icons";
import Cookies from 'js-cookie';
import axios from 'axios';
import {apiUrl} from "./api/api";
import {redirect} from "@remix-run/router";
import Home from "./components/Home/Home";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLUListElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);


    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
            Cookies.remove('authToken');
            setIsLoggedIn(false);
            redirect('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                hideSidebar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        <li><Link to={"/blog"} onClick={hideSidebar}>Blog</Link></li>
                        <li><Link to={"/about"} onClick={hideSidebar}>About</Link></li>
                        <li><Link to={"/contact"} onClick={hideSidebar}>Contact</Link></li>
                        <li><Link to={"/login"} onClick={hideSidebar}>Login</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={"/home"}>Daily Dinner</Link></li>
                        <li className={"hideOnMobile"}><Link to={"/blog"}>Blog</Link></li>
                        <li className={"hideOnMobile"}><Link to={"/about"}>About</Link></li>
                        <li className={"hideOnMobile"}><Link to={"/contact"}>Contact</Link></li>
                        {isLoggedIn ? (
                            <li className={"hideOnMobile"}><Link to={"/logout"} onClick={handleLogout}>Logout</Link></li>
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
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/fallback" element={<FallbackPage/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route element={<FallbackPage/>}/>
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
                    <li>What's new</li>
                    <li>About us</li>
                </ul>
                <ul>
                    <h1>Resources</h1>
                    <li>Cookie Management</li>
                    <li>Privacy Policy</li>
                    <li>Imprint</li>
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
        </Router>
    );
};

export default App;
