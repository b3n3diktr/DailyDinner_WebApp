import React, { useState, useEffect } from 'react';
import '../../style.css';
import { auth } from "../../api/api";
import Cookies from "js-cookie";
import { DashboardIcon, AccountIcon, PaymentsIcon, LogoutIcon, BillingIcon } from "../../icons/icons";
import { useLocation } from 'react-router-dom';

const MyAccount: React.FC = () => {
    const [sessionID, setSessionID] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [accountCreated, setAccountCreated] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const currentHash = location.hash;

    useEffect(() => {
        const token = Cookies.get('sessionID');
        if (token) {
            setSessionID(token);
            validateSessionID(token).catch((err: unknown) => { });
        }
    }, []);

    const validateSessionID = async (sessionID: string) => {
        try {
            const response = await auth(sessionID);
            setIsValid(true);
            setUsername(response.username);
            setEmail(response.email);
            setAccountCreated(response.accountCreated);
        } catch (error: unknown) {
            setIsValid(false);
            Cookies.remove('sessionID');
            window.location.href = '/signin';
        }
    };

    const handleLogout = async () => {
        Cookies.remove('sessionID');
        window.location.href = '/signin';
    }

    return (
        <div className="">
            {isValid ? (
                <div className="bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text-variant tracking-wide min-h-[80vh]">
                    <div className="flex flex-col p-8 pl-2 w-[250px] bg-base dark:bg-darkmode-base rounded-r-lg shadow-lg border-[1px] border-text-variant dark:border-darkmode-text-variant">
                        <div className="flex flex-col items-center justify-center space-y-4 overflow-hidden">
                            <div>
                                <img className="w-16 h-16 rounded-full border-2 border-black" alt="Profile" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold">{username}</p>
                                <p className="text-xs mt-0.5 font-light">{email}</p>
                            </div>
                        </div>
                        <hr className="my-6 w-full border-text-variant dark:border-darkmode-text-variant" />
                        <ul className="divide-y divide-text-variant dark:divide-darkmode-text-variant">
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant rounded-tr-lg">
                                <a href="#dashboard" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{DashboardIcon()}</span>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <a href="#profile" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{AccountIcon()}</span>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <a href="#billing" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{BillingIcon()}</span>
                                    <span>Billing</span>
                                </a>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <a href="#payments" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{PaymentsIcon()}</span>
                                    <span>Payments</span>
                                </a>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant rounded-br-lg">
                                <a className="text-sm flex items-center px-4 py-3 transition-all rounded-br-lg" onClick={handleLogout}>
                                    <span className="mr-4">{LogoutIcon()}</span>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Conditional Rendering Based on Hash */}
                    <div className="mt-8 p-4">
                        {currentHash === '#dashboard' && <div>Dashboard Content</div>}
                        {currentHash === '#profile' && <div>Profile Content</div>}
                        {currentHash === '#billing' && <div>Billing Content</div>}
                        {currentHash === '#payments' && <div>Payments Content</div>}
                    </div>
                </div>
            ) : (
                <div>
                    <p>Invalid session ID or not logged in. Please try again</p>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
