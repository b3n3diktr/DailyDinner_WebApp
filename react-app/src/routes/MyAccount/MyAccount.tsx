import React, { useState, useEffect } from 'react';
import { auth, getProfilePicture, logout } from '../../api/api';
import Cookies from 'js-cookie';
import { DashboardIcon, AccountIcon, PaymentsIcon, LogoutIcon, BillingIcon } from '../../icons/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfilePicture from './utils/ProfilPicture';
import Profile from "./Profile";
import Payments from "./Payments";
import Dashboard from "./Dashboard";

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
        if (loggedIn === 'true') {
            validateSessionID();
        } else {
            navigate('/signin');
        }
    }, []);

    const validateSessionID = async () => {
        try {
            const response = await auth();
            setIsValid(true);
            setUsername(response.username);
            setEmail(response.email);
            loadProfilePicture(response.data.id);
        } catch (error) {
            setIsValid(false);
            Cookies.remove('SESSIONID');
            Cookies.set('loggedIn', 'false');
            navigate('/signin');
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
    };

    return (
        <div className="flex min-h-screen bg-background dark:bg-darkmode-background text-text dark:text-darkmode-text">
            {isValid ? (
                <div className="flex w-full">
                    {/* Sidebar */}
                    <div className="flex flex-col p-6 w-60 bg-background-variant-1 dark:bg-darkmode-background-variant-1">
                        <div className="flex flex-col items-center mb-6">
                            <ProfilePicture imageUrl={profilePictureUrl || ''} size="120px" />
                            <p className="text-lg font-semibold mt-2">{username}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                        </div>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#dashboard" className="flex items-center p-3 rounded-lg hover:bg-secondary dark:hover:bg-darkmode-secondary">
                                    {DashboardIcon()} <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#profile" className="flex items-center p-3 rounded-lg hover:bg-secondary dark:hover:bg-darkmode-secondary">
                                    {AccountIcon()} <span className="ml-3">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#payments" className="flex items-center p-3 rounded-lg hover:bg-secondary dark:hover:bg-darkmode-secondary">
                                    {PaymentsIcon()} <span className="ml-3">Payments</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-lg hover:bg-error text-red-500">
                                    {LogoutIcon()} <span className="ml-3">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Main Content */}
                    <div className="flex-grow flex items-center justify-center p-8">
                        <div className="w-full max-w-3xl">
                            {currentHash === '#dashboard' && <Dashboard/>}
                            {currentHash === '#profile' && <Profile/>}
                            {currentHash === '#payments' && <Payments />}
                            {!currentHash && <div>Welcome to your account. Select a menu item to view details.</div>}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p>Invalid session. Please sign in.</p>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
