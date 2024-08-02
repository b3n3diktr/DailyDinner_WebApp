import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../../style.css';


const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const consent = Cookies.get('cookieConsent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        Cookies.set('cookieConsent', 'true', { expires: 14 });
        setVisible(false);
    };

    const declineCookies = () => {
        Cookies.set('cookieConsent', 'false', { expires: 14 });
        setVisible(false);
    };

    return (
        visible && (
            <div className="cookie-consent">
                <div className="cookie-consent-inner">
                    <div className="cookie-consent-copy">
                        <h1>THIS WEBSITE USES COOKIES</h1>
                        <p>
                            We use cookies to improve your experience. By continuing to use our site, you accept our use of cookies.
                            Read more in our <Link to="/privacy-policy">Privacy Policy</Link>.
                        </p>
                    </div>

                    <div className="cookie-consent-actions">
                        <button className="cookie-consent-accept" onClick={acceptCookies}>
                            OK
                        </button>

                        <button className="cookie-consent-decline" onClick={declineCookies}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CookieConsent;