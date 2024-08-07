import React, { useState, useEffect } from 'react';
import '../../style.css';
import { auth } from "../../api/api";
import Cookies from "js-cookie";

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
        Cookies.remove('sessionID');
        window.location.href = '/login';
    }

    return (
        <div className="wrapper-main">
            <h1>Account Page</h1>
            {isValid ? (
                <div className="account-cnt">
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <p>Account Created: {accountCreated}</p>
                    <div>
                        <button className="account-logout-button" type="button" onClick={handleLogout}>Logout</button>
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
