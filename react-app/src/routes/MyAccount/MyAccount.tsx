import React, {useState, useEffect, useMemo, memo} from 'react';
import { useQuery } from "@tanstack/react-query";
import { ApiUsers } from '../../api/apiUsers';
import { DashboardIcon, AccountIcon, PaymentsIcon, LogoutIcon } from '../../icons/icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import ProfilePicture from './utils/ProfilPicture';
import Profile from "./Profile";
import Payments from "./Payments";
import Dashboard from "./Dashboard";

const MyAccount: React.FC = memo(() => {
    console.log("MyAccount");
    const navigate = useNavigate();
    const location = useLocation();
    const currentHash = location.hash;

    const { data: sessionData, isLoading: sessionLoading, isError: sessionError, isFetched: sessionFetched } = useQuery({
        queryKey: ['validate-session'],
        queryFn: ApiUsers.auth,
        staleTime: 5 * 60 * 1000,
    });

    const { data: profilePicture, isLoading: pictureLoading } = useQuery({
        queryKey: ['profile-picture', sessionData?.data.id],
        queryFn: () => ApiUsers.getProfilePicture(sessionData?.data.id),
        staleTime: 5 * 60 * 1000,
        enabled: !!sessionData?.data.id, // Only run when we have a session ID
    });

    useEffect(() => {
        if (sessionError) {
            ApiUsers.logout();
            navigate('/signin');
        }
    }, [sessionError, navigate]);

    const handleLogout = useMemo(() => async () => {
        await ApiUsers.logout();
        navigate('/signin');
        window.location.reload();
    }, [navigate]);

    // Memoize sidebar content
    const SidebarContent = useMemo(() => (
        <div className="flex flex-col p-6 w-60 bg-background-variant-1 dark:bg-darkmode-background-variant-1">
            <div className="flex flex-col items-center mb-6">
                <ProfilePicture imageUrl={profilePicture || ''} size="120px" />
                <p className="text-lg font-semibold mt-2">{sessionData?.data.username}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sessionData?.data.email}</p>
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
    ), [profilePicture, sessionData?.data.username, sessionData?.data.email, handleLogout]);

    // Loading state
    if (sessionLoading || pictureLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    // Main content
    const MainContent = (
        <div className="flex-grow flex items-center justify-center p-8">
            <div className="w-full max-w-3xl">
                {currentHash === '#dashboard' && <Dashboard />}
                {currentHash === '#profile' && (
                    <Profile username={sessionData?.data.username} email={sessionData?.data.email} imageUrl={profilePicture} uuid={sessionData?.data.id}/>
                )}
                {currentHash === '#payments' && <Payments />}
                {!currentHash && <div>Welcome to your account. Select a menu item to view details.</div>}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-background dark:bg-darkmode-background text-text dark:text-darkmode-text">
            {sessionFetched && !sessionError ? (
                <div className="flex w-full">
                    {SidebarContent}
                    {MainContent}
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p>Invalid session. Please sign in.</p>
                </div>
            )}
        </div>
    );
});

export default MyAccount;