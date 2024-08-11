import { BrowserRouter as Router } from 'react-router-dom';
import DarkmodeButton from "./components/Darkmode/Darkmode";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Copyright from "./Copyright/Copyright";
import React from 'react';
import './style.css';

const App: React.FC = () => {


    return (
        <Router>
            <DarkmodeButton/>
            <NavBar/>
            <Footer/>
            <Copyright/>
            <CookieConsent />
        </Router>
    );
};

export default App;
