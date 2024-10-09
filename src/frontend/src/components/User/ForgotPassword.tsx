import React from 'react';
import '../../style.css';
import { resetPassword } from "../../api/api";
import { EmailIcon } from "../../icons/icons";
import {Link} from "react-router-dom";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await resetPassword(email);
            setMessage(`${response.message}`);
        } catch (error: any) {
            setMessage(`Password reset failed: ${error.response?.data?.message || 'Please try again.'}`);
        }
    }

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant h-screen w-[max(40%,_37.5rem)] p-4 text-text flex flex-col items-center justify-center rounded-r-xl">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">Forgot Password</h1>
                <p className={`${message ? 'mb-4 text-error' : ''}`}>{message}</p>
                <form id="form" className="space-y-6">
                    <p className="text-sm text-text dark:text-darkmode-text mb-6">
                        Enter the email address associated with your account and we'll send you a link to reset your password.
                    </p>
                    <div className="relative">
                        <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                            {EmailIcon()}
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            id="email-input"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                    >
                        Submit
                    </button>
                </form>
                <p className="mt-6 text-left text-text dark:text-darkmode-text">
                    New here? <Link to="/register" className="text-link-theme hover:underline dark:text-link-theme">Create an Account</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
