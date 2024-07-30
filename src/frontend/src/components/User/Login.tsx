import React, { useState } from 'react';
import {login} from '../../api/api';
import '../../style.css';
import {PasswordIcon, VisibilityIcon, VisibilityOff} from "../../icons/icons";
import {redirect} from "@remix-run/router";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response && response.message) {
                setMessage(response.message);
                redirect('/');
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error: any) {
            setMessage(`Login failed: ${error.message || 'Please try again.'}`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="wrapper-auth">
            <h1>Login</h1>
            <p className={success ? 'correct-message' : 'error-message'}>{message}</p>
            <form id={"form"}>
                <div>
                    <label>
                        <span>@</span>
                    </label>
                    <input type="email" placeholder="Email" value={email} id={"email-input"} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-input-wrapper">
                    <label>
                        {PasswordIcon()}
                    </label>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <button type="button" className="password-toggle-button" onClick={toggleShowPassword}>
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <p>New here? <a href={"/register"}>Create an Account</a></p>
        </div>
    );
};

export default Login;