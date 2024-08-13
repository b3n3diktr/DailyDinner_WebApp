import React, { useState } from 'react';
import '../../style.css';
import { register } from "../../api/api";
import {AccountIcon, EmailIcon, PasswordIcon, VisibilityIcon, VisibilityOff} from "../../icons/icons";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    let success: boolean = false;
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            success = false;
            return;
        }
        try {
            const response = await register(username, email, password);
            setMessage(response.message);
            success = true;
        } catch (error: any) {
            success = false;
            setMessage(`${error.response.data.message || 'Please try again.'}`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant h-screen w-[max(40%,_37.5rem)] p-4 text-text flex flex-col items-center justify-center rounded-r-xl">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">Register</h1>
            <p className={`${success ? 'text-accent' : 'text-error'} mb-4`}>{message}</p>
            <form id="form" className="space-y-6">
                <div className="relative">
                    <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                        {AccountIcon()}
                    </label>
                    <input
                        type="username"
                        placeholder="Username"
                        value={username}
                        id="user-input"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                    />
                </div>
                <div className="relative">
                    <label
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                        {EmailIcon()}
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        id="email-input"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                    />
                </div>
                <div className="relative">
                    <label
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
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
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-variant dark:text-darkmode-text-variant"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <div className="relative">
                    <label
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
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
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-variant dark:text-darkmode-text-variant"
                        onClick={toggleShowPassword}>
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                >
                    Register
                </button>
            </form>
            <p className="p-4 font-bold" >Already have an account? <a href="/signin" className="underline text-accent">Sign in</a></p>
            <div className="p-4 text-text-variant border-t-[1px] text-sm text-center max-w-[20rem]">
                <p>By creating an account you agree to our <a href="/tos" className="underline text-accent">Terms of Service </a>and <a
                    href="/privacy-policy" className="underline text-accent">Privacy Policy</a></p>
            </div>
            </div>
        </div>
    );
};

export default Register;
