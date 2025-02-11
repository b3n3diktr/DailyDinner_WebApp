import React, { useState } from 'react';
import { EmailIcon, PasswordIcon, VisibilityIcon, VisibilityOff } from "../../icons/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "../../api/api";

const encodeQueryParams = (params: Record<string, string>) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const PasswordReset: React.FC = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const token = query.get('token');

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setSuccess(false);
            return;
        }

        try {
            const response = await resetPassword(token, password);
            setMessage(response.message);
            setSuccess(true);
        } catch (error: any) {
            setSuccess(false);
            setMessage(`Resetting Password failed. ${error.response?.data?.message || 'Please try again.'}`);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await requestPasswordReset(email);
            setMessage(response.message);
            setSuccess(true);
        } catch (error: any) {
            setSuccess(false);
            setMessage(`Password reset failed: ${error.response?.data?.message || 'Please try again.'}`);
        }
    };

    if (token === '') {
        const params = encodeQueryParams({
            errorCode: '400',
            message: 'Invalid token.',
            header: 'Error.'
        });
        navigate(`/fallback?${params}`);
        return null;
    }

    return (
        <div className="bg-background-variant-1 dark:bg-darkmode-background-variant-1 h-screen w-full p-4 text-text flex flex-col items-center justify-center">
            <div className="bg-background dark:bg-darkmode-background shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-primary ">
                    {token ? 'Reset your Password' : 'Forgot Password'}
                </h1>
                {message && (
                    <p className={`${success ? 'text-success' : 'text-error'} mb-4`}>{message}</p>
                )}
                <form id="form" className="space-y-6">
                    {token ? (
                        <>
                            <div className="relative">
                                <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                                    {PasswordIcon()}
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-3 py-3 border-2 border-neutral-light dark:border-darkmode-neutral-light rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text focus:outline-none focus:border-primary hover:border-accent"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text dark:text-darkmode-text"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? VisibilityIcon() : VisibilityOff()}
                                </button>
                            </div>
                            <div className="relative">
                                <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                                    {PasswordIcon()}
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Repeat Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-3 py-3 border-2 border-neutral-light dark:border-darkmode-neutral-light rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text focus:outline-none focus:border-primary hover:border-accent"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text dark:text-darkmode-text"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? VisibilityIcon() : VisibilityOff()}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="w-full py-3 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant focus:outline-none"
                            >
                                Change Password
                            </button>
                        </>
                    ) : (
                        <>
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
                                    className="w-full pl-12 pr-3 py-3 border-2 border-neutral-light dark:border-darkmode-neutral-light rounded-lg bg-neutral-light dark:bg-darkmode-neutral-light text-text dark:text-darkmode-text focus:outline-none focus:border-primary hover:border-accent"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="w-full py-3 bg-primary text-text dark:text-darkmode-text rounded-lg hover:bg-primary-variant focus:outline-none"
                            >
                                Submit
                            </button>
                            <p className="mt-6 text-left text-text dark:text-darkmode-text">
                                New here? <Link to="/register" className="text-primary hover:text-primary-variant hover:underline dark:text-primary dark:hover:text-primary-variant">Create an Account</Link>
                            </p>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;