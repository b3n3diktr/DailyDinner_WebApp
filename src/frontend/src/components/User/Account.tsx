import React, { useState, useEffect } from 'react';
import '../../style.css';
import { auth } from "../../api/api";
import Cookies from "js-cookie";

const Account: React.FC = () => {
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
            validateSessionID(token).catch((err) => {
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
        } catch (error: any) {
            setIsValid(false);
            Cookies.remove('sessionID');
        }
    };

    return (
        <div className="wrapper-main">
            <h1>Account Page</h1>
            {isValid ? (
                <>
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <p>Account Created: {accountCreated}</p>
                </>
            ) : (
                <p>Invalid session ID or not logged in. Please try again</p>
            )}
        </div>
    );
};

export default Account;
