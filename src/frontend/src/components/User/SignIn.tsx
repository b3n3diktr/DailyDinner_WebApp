import React, { useEffect, useState } from 'react';
import { login } from '../../api/api';
import { EmailIcon, PasswordIcon, VisibilityIcon, VisibilityOff } from "../../icons/icons";
import Cookies from "js-cookie";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    let success: boolean = false;
    const [cookies, setCookies] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        console.log("SignIn!");
        e.preventDefault();
        try {
            const response = await login(email, password, rememberMe);
            setMessage(`${response.message}`);
            window.location.href = "/myaccount";
            success = true;
        } catch (error: any) {
            setMessage(`${error.response.data.message || 'Please try again.'}`);
            success = false;
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const cookieConsent = Cookies.get('cookieConsent');
        setCookies(cookieConsent === 'true');
    }, []);

    return (
        <div className="bg-base-variant dark:bg-darkmode-base-variant h-screen w-[max(40%,_37.5rem)] p-4 text-text flex flex-col items-center justify-center rounded-r-xl ">
            <div className="bg-base dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-left text-text dark:text-darkmode-text">Sign In</h1>
                <p className={`${success ? 'text-accent' : 'text-error'} mb-4`}>{message}</p>
                <form id="form" className="space-y-6">
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
                            className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text"
                        />
                    </div>
                    <div className="relative">
                        <label className="absolute inset-y-0 left-0 flex items-center pl-3 text-text dark:text-darkmode-text">
                            {PasswordIcon()}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-3 py-3 border-2 border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-variant dark:text-darkmode-text-variant"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? VisibilityOff() : VisibilityIcon()}
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        {cookies && (
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-accent border-input rounded focus:ring-focus-text"
                                />
                                <p className="ml-2 text-sm text-text dark:text-darkmode-text">Remember me</p>
                            </div>
                        )}
                        <a href="/forgot-password"
                           className="text-sm text-link-theme hover:underline dark:text-link-theme">Forgot Password?</a>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full py-3 bg-accent text-white rounded-lg hover:bg-focus-text focus:outline-none"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-left text-text dark:text-darkmode-text">
                    New here? <a href="/register" className="text-link-theme hover:underline dark:text-link-theme">Create
                    an Account</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
