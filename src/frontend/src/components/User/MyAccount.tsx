import React, {useState, useEffect} from 'react';
import '../../style.css';
import {auth} from "../../api/api";
import Cookies from "js-cookie";
import {DashboardIcon, AccountIcon, PaymentsIcon, LogoutIcon, BillingIcon} from "../../icons/icons";

const MyAccount: React.FC = () => {
    const [sessionID, setSessionID] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [accountCreated, setAccountCreated] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = Cookies.get('sessionID');
        if (token) {
            setSessionID(token);
            validateSessionID(token).catch((err: unknown) => {
            });
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
        }
    };

    const handleLogout = async () => {
        //Cookies.remove('sessionID');
        window.location.href = '/signin';
    }

    return (
        <div className="">
            {isValid ? (
                <div className="bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text-variant tracking-wide min-h-[80vh]">
                    <div className="flex flex-col p-8 pl-2 w-[250px] bg-base dark:bg-darkmode-base rounded-r-lg shadow-lg border-[1px] border-text-variant dark:border-darkmode-text-variant">
                        <div className="flex flex-col items-center justify-center space-y-4 overflow-hidden">
                            <div>
                                <img className="w-16 h-16 rounded-full border-2 border-black" alt="Profile"/>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold">{username}</p>
                                <p className="text-xs mt-0.5 font-light">{email}</p>
                            </div>
                        </div>
                        <hr className="my-6 w-full border-text-variant dark:border-darkmode-text-variant" />
                        <ul className="divide-y divide-text-variant dark:divide-darkmode-text-variant">
                            <li>
                                <a className="text-sm flex items-center hover:bg-gray-700 px-4 py-3 transition-all rounded-tr-lg">
                                    <a className="mr-4">{DashboardIcon()}</a>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a className="text-sm flex items-center hover:bg-gray-700 px-4 py-3 transition-all">
                                    <a className="mr-4">{AccountIcon()}</a>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a className="text-sm flex items-center hover:bg-gray-700 px-4 py-3 transition-all">
                                    <a className="mr-4">{BillingIcon()}</a>
                                    <span>Billing</span>
                                </a>
                            </li>
                            <li>
                                <a className="text-sm flex items-center hover:bg-gray-700 px-4 py-3 transition-all">
                                    <a className="mr-4">{PaymentsIcon()}</a>
                                    <span>Payments</span>
                                </a>
                            </li>
                            <li>
                                <a className="text-sm flex items-center hover:bg-gray-700 px-4 py-3 transition-all rounded-br-lg">
                                    <a className="mr-4">{LogoutIcon()}</a>
                                <button onClick={handleLogout}>Logout</button>
                                </a>
                            </li>
                        </ul>
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
