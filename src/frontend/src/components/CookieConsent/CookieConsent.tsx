import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
        window.location.reload();
    };

    const declineCookies = () => {
        Cookies.set('cookieConsent', 'false', { expires: 14 });
        setVisible(false);
        window.location.reload();
    };

    return (
        visible && (
            <div className="fixed bottom-0 left-0 z-[2147483645] w-full box-border py-8 bg-gray-100 dark:bg-gray-900">
                <div className="max-w-[1000px] mx-auto px-4">
                    <div className="mb-4 text-text dark:text-darkmode-text">
                        <h1 className="leading-6 mb-2">THIS WEBSITE USES COOKIES</h1>
                        <p className="leading-6">
                            We use cookies to improve your experience. By continuing to use our site, you accept our use of cookies.
                            Read more in our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="min-w-[164px] py-2.5 px-3.5 rounded-full bg-green-500 text-white text-center text-base leading-5 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
                            onClick={acceptCookies}
                        >
                            OK
                        </button>

                        <button
                            className="min-w-[164px] py-2.5 px-3.5 rounded-full border border-gray-400 dark:border-gray-600 bg-transparent text-green-500 dark:text-green-400 text-center text-base leading-5 hover:border-gray-500 dark:hover:border-gray-500 hover:text-green-600 dark:hover:text-green-500"
                            onClick={declineCookies}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CookieConsent;
