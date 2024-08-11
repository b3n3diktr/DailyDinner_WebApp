import React, {useState} from "react";
import {Link} from "react-router-dom";
import {GitHubLogo, InstagramLogo, XLogo, YoutubeLogo} from "../../icons/icons";
import Cookies from "js-cookie";

const Footer = () => {
    const [showCookieConsent, setShowCookieConsent] = useState(false);

    const manageCookies = async () =>{
        Cookies.remove("cookieConsent");
        window.location.reload();
    }

    return (
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
    );
}

export default Footer;