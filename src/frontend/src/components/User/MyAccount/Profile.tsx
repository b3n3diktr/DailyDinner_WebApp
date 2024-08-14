import React, {useEffect, useState} from 'react';
import '../../../style.css';
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import {auth} from "../../../api/api";
import {AccountIcon} from "../../../icons/icons";

const Profile: React.FC = () => {
    const [sessionID, setSessionID] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [accountCreated, setAccountCreated] = useState('');

    const location = useLocation();
    const currentHash = location.hash;

    useEffect(() => {
        const token = Cookies.get('sessionID');
        if (token) {
            setSessionID(token);
            validateSessionID(token).catch((err) => { console.log(err); });
        } else {
            window.location.href = '/signin';
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

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant text-text dark:text-darkmode-text p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <div className="w-32 h-32">
                    <img
                        className="w-full h-full rounded-full object-cover border-2 border-text-variant dark:border-darkmode-text-variant"
                        src="path_to_profile_picture"
                        alt="Profile"
                    />
                </div>

                {/* Basic Information */}
                <div className="flex flex-col space-y-4 text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold">{username}</h2>
                        <p className="text-sm text-text-variant dark:text-darkmode-text-variant">{email}</p>
                    </div>
                    <div>
                        <p className="text-sm">Account Created: {accountCreated}</p>
                    </div>
                </div>
            </div>

            {/* Additional Details */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="font-semibold">Phone Number:</p>
                        <p className="text-sm">+1 123 456 7890</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address:</p>
                        <p className="text-sm">Musterstraße 1A, 12345, Berlin, Deutschland</p>
                    </div>
                    <div>
                        <p className="font-semibold">Subscription Plan:</p>
                        <p className="text-sm">Free</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
