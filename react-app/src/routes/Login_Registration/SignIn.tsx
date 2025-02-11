import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailIcon, PasswordIcon, VisibilityIcon, VisibilityOff } from '../../icons/icons';
import { login } from "../../api/api";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/myaccount');
            window.location.reload();
        } catch (error: any) {
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-background dark:bg-darkmode-background-variant-1 text-text dark:text-darkmode-text">
            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-12">
                <div className="w-full max-w-md bg-base dark:bg-darkmode-background-variant-1 p-8 ">
                    <h1 className="text-3xl font-bold mb-6 text-primary dark:text-darkmode-primary">Login to Your Account</h1>
                    {errorMessage && <p className="text-error mb-4">{errorMessage}</p>}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{EmailIcon()}</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-input dark:border-darkmode-input bg-input dark:bg-darkmode-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                        <div className="relative">
                            <label className="absolute inset-y-0 left-3 flex items-center">{PasswordIcon()}</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 border border-input dark:border-darkmode-input bg-input dark:bg-darkmode-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? VisibilityIcon() : VisibilityOff()}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500 dark:text-darkmode-text-variant">
                            Forgot your password?{' '}
                            <Link to="/reset-password" className="text-primary dark:text-darkmode-primary hover:underline">
                                Reset Password
                            </Link>
                        </p>
                    </div>

                    {/* Add "Create Login_Registration" link below the button on small screens */}
                    <div className="mt-4 text-center lg:hidden">
                        <p className="text-sm text-gray-500 dark:text-darkmode-text-variant">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary dark:text-darkmode-primary hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Sign Up Call to Action */}
            <div className="relative hidden lg:flex w-1/2 flex-col items-center justify-center text-white p-8 overflow-hidden">
                <div className="absolute inset-0 bg-placeholder bg-cover bg-no-repeat bg-center bg-fixed blur-[1px]"></div>
                <div className="backdrop-blur-md dark:bg-darkmode-base shadow-md rounded-lg p-8 w-full max-w-md relative z-10 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold mb-4">New Here?</h2>
                    <p className="text-lg mb-6">Sign up and start your journey with us!</p>
                    <Link
                        to="/register"
                        className="inline-block px-8 py-3 bg-primary dark:bg-darkmode-primary text-white rounded-lg shadow-md hover:bg-primary-variant dark:hover:bg-darkmode-primary-variant transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
