import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/User/Register';
import Login from './components/User/Login';
import FallbackPage from "./components/User/FallbackPage";
import Contact from "./components/Contact/Contact";
import './style.css';
import {AccountIcon} from "./icons/icons";
import About from "./components/About/About";

const App: React.FC = () => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleAccountClick = () => {
        setShowAccountMenu(!showAccountMenu);
    };

    return (
        <Router>
            <div id="font" className="app-container">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h1>Daily Dinner</h1>
                </Link>
                <nav>
                    <ul>
                        <li className="left-side">
                            <Link to="/contact">Contact</Link>
                            <Link to="/about">About</Link>
                        </li>
                        <li className="right-side" onClick={handleAccountClick}>
                            {AccountIcon()}
                            {showAccountMenu && (
                                <ul className="account-menu">
                                    <li>
                                        <Link to="/login">Login</Link>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/fallback" element={<FallbackPage/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route element={<FallbackPage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;