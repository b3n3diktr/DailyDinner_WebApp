import React, { useState } from 'react';
import { register } from "../../api/api";
import { AccountIcon, EmailIcon, PasswordIcon, VisibilityIcon, VisibilityOff } from "../../icons/icons";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setSuccess(false);
            return;
        }
        try {
            const response = await register(username, email, password);
            setSuccess(true);
            setMessage(response.message);
        } catch (error: any) {
            setSuccess(false);
            setMessage(`${error.response.data.message || 'Please try again.'}`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen bg-background dark:bg-darkmode-background-variant-1 text-text dark:text-darkmode-text">
            {/* Left Side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="bg-base dark:bg-darkmode-base p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-primary dark:text-darkmode-primary">Create an Account</h1>
                    <p className={`${success ? 'text-success' : 'text-error'} mb-4`}>{message}</p>
                    <form className="space-y-6">
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{AccountIcon()}</label>
                            <input
                                type="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-3 py-3 border border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                            />
                        </div>
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{EmailIcon()}</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-3 py-3 border border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                            />
                        </div>
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{PasswordIcon()}</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-3 py-3 border border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? VisibilityIcon() : VisibilityOff()}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{PasswordIcon()}</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-12 pr-3 py-3 border border-input dark:border-darkmode-base rounded-lg bg-input dark:bg-darkmode-base-variant text-text dark:text-darkmode-text focus:outline-none focus:border-focus-text hover:border-accent"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? VisibilityIcon() : VisibilityOff()}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-focus-text focus:outline-none"
                        >
                            Register
                        </button>
                    </form>

                    {/* Add "Sign In" link below the form on small screens */}
                    <div className="mt-4 text-center lg:hidden">
                        <p className="text-sm text-gray-500 dark:text-darkmode-text-variant">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-primary dark:text-darkmode-primary hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign In Call-to-Action */}
            <div className="relative hidden lg:flex w-1/2 flex-col items-center justify-center text-white p-8 overflow-hidden">
                <div className="absolute inset-0 bg-placeholder bg-cover bg-no-repeat bg-center bg-fixed blur-[1px]"></div>
                <div className="backdrop-blur-md dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md relative z-10 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold mb-4">Already have an account?</h2>
                    <p className="text-lg mb-6">Sign in and continue your journey with us!</p>
                    <Link
                        to="/signin"
                        className="inline-block px-8 py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                        Sign In
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Register;
