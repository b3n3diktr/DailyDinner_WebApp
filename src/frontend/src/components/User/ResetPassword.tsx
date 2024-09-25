import React, { useState } from 'react';
import '../../style.css';
import { PasswordIcon, VisibilityIcon, VisibilityOff } from "../../icons/icons";
import { useLocation } from "react-router-dom";
import { changePassword } from "../../api/api";

const encodeQueryParams = (params: Record<string, string>) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    let success: boolean = false;

    const query = useQuery();
    const resetToken = query.get('resetToken');
    if (!resetToken) {
        const params = encodeQueryParams({
            errorCode: '400',
            message: 'Invalid token.',
            header: 'Error.'
        });
        window.location.href = `/fallback?${params}`;
        return;
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            success = false;
            return;
        }
        try {
            const response = await changePassword(resetToken, password);
            setMessage(response.message);
            success = true;
        } catch (error: any) {
            success = false;
            setMessage(`Resetting Password failed. ${error.response?.data?.message || 'Please try again.'}`);
        }
    }

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant h-screen w-[max(40%,_37.5rem)] p-4 text-text flex flex-col items-center justify-center rounded-r-xl">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">Reset your Password</h1>
                <p className={`${success ? 'text-accent' : 'text-error'} mb-4`}>{message}</p>
                <form id="form" className="space-y-6">
                    <div className="relative">
                        <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                            {PasswordIcon()}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text dark:text-darkmode-text"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? VisibilityOff() : VisibilityIcon()}
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
                            className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text dark:text-darkmode-text"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? VisibilityOff() : VisibilityIcon()}
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleResetPassword}
                        className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
