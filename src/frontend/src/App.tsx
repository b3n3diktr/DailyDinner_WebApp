import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/User/Register';
import Login from './components/User/Login';
import FallbackPage from "./components/User/FallbackPage";
import Contact from "./components/Contact/Contact";
import './style.css';
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";
import { HamMenu, Close } from "./icons/icons";

const App: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLUListElement>(null);

    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);

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
                <nav>
                    <ul ref={sidebarRef} className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                        <li>
                            <a onClick={hideSidebar}>
                                {Close()}
                            </a>
                        </li>
                        <li><Link to="/blog" onClick={hideSidebar}>Blog</Link></li>
                        <li><Link to="/about" onClick={hideSidebar}>About</Link></li>
                        <li><Link to="/contact" onClick={hideSidebar}>Contact</Link></li>
                        <li><Link to="/login" onClick={hideSidebar}>Login</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/">Daily Dinner</Link></li>
                        <li className={"hideOnMobile"}><Link to="/blog">Blog</Link></li>
                        <li className={"hideOnMobile"}><Link to="/about">About</Link></li>
                        <li className={"hideOnMobile"}><Link to="/contact">Contact</Link></li>
                        <li className={"hideOnMobile"}><Link to="/login">Login</Link></li>
                        <li className={"menu-button"}>
                            <a onClick={showSidebar}>
                                {HamMenu()}
                            </a>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/fallback" element={<FallbackPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route element={<FallbackPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
