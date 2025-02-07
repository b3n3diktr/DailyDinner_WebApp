import React, { useState, useEffect } from 'react';
import '../../../style.css';
import {apiUrl, auth, getProfilePicture, logout} from "../../../api/api";
import Cookies from "js-cookie";
import { DashboardIcon, AccountIcon, PaymentsIcon, LogoutIcon, BillingIcon } from "../../../icons/icons";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Billing from "./Billing";
import Payments from "./Payments";
import ProfilePicture from "./utils/ProfilPicture";
import axios from 'axios';

const MyAccount: React.FC = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>();

    const location = useLocation();
    const currentHash = location.hash;

    useEffect(() => {
        const loggedIn = Cookies.get('loggedIn');
        if (loggedIn == "true") {
            validateSessionID().catch((err: unknown) => { console.log("error:" + err); });
        } else {
            navigate('/signin');
            window.location.reload();
        }
    }, []);

    const validateSessionID = async () => {
        try {
            const response = await auth();
            setIsValid(true);
            setUsername(response.username);
            setEmail(response.email);
            await loadProfilePicture(response.data.id);
        } catch (error: unknown) {
            setIsValid(false);
            Cookies.remove('SESSIONID');
            Cookies.set("loggedIn", "false");
            navigate('/signin');
            window.location.reload();
        }
    };

    const loadProfilePicture = async (uuid: string) => {
        try {
            const response = await getProfilePicture(uuid);
            setProfilePictureUrl(response);
        } catch (error) {
            console.error('Failed to load profile picture', error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/signin');
        window.location.reload();
    }

    return (
        <div className="flex min-h-screen bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text-variant tracking-wide">
            {isValid ? (
                <div className="flex w-full">
                    {/* Sidebar */}
                    <div className="flex flex-col p-8 pl-2 h-[57vh] w-[250px] bg-base dark:bg-darkmode-base rounded-r-lg shadow-lg border-[1px] border-text-variant dark:border-darkmode-text-variant">
                        <div className="flex flex-col items-center justify-center space-y-4 overflow-hidden">
{/*                            <div className="w-24 h-24 relative">
                                <img
                                    className="w-24 h-24 rounded-full border-2 border-black"
                                    src={profilePictureURL}
                                    alt="Profile"
                                />
                            </div>*/}
                            <ProfilePicture imageUrl={profilePictureUrl || ""} size="150px" />
                            <div className="text-center">
                                <p className="text-sm font-bold">{username}</p>
                                <p className="text-xs mt-0.5 font-light">{email}</p>
                            </div>
                        </div>
                        <hr className="my-6 w-full border-text-variant dark:border-darkmode-text-variant" />
                        <ul className="divide-y divide-text-variant dark:divide-darkmode-text-variant">
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant rounded-tr-lg">
                                <Link to="#dashboard" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{DashboardIcon()}</span>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <Link to="#profile" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{AccountIcon()}</span>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <Link to="#billing" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{BillingIcon()}</span>
                                    <span>Billing</span>
                                </Link>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant">
                                <Link to="#payments" className="text-sm flex items-center px-4 py-3 transition-all">
                                    <span className="mr-4">{PaymentsIcon()}</span>
                                    <span>Payments</span>
                                </Link>
                            </li>
                            <li className="hover:bg-base-variant dark:hover:bg-darkmode-base-variant rounded-br-lg">
                                <a onClick={handleLogout} className="text-sm flex items-center px-4 py-3 transition-all rounded-br-lg cursor-pointer">
                                    <span className="mr-4">{LogoutIcon()}</span>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow flex items-center justify-center p-8">
                        <div className="w-full max-w-3xl">
                            {currentHash === '#dashboard' && <Dashboard />}
                            {currentHash === '#profile' && <Profile />}
                            {currentHash === '#billing' && <Billing />}
                            {currentHash === '#payments' && <Payments />}
                            {!currentHash && <div>Welcome to your account. Select a menu item to view details.</div>}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p>Invalid session ID or not signed in. Please sign in.</p>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
