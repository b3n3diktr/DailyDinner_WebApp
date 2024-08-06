import React, {useEffect, useState} from 'react';
import {login} from '../../api/api';
import '../../style.css';
import {PasswordIcon, VisibilityIcon, VisibilityOff} from "../../icons/icons";
import Cookies from "js-cookie";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const success = useState(false);
    const [cookies, setCookies] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(email, password, rememberMe);
            setMessage(`${response.message}`);
            window.location.href="/account";

        } catch (error: any) {
            setMessage(`Login failed: ${error.response.data.message || 'Please try again.'}`);
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
        <div className="wrapper-auth">
            <h1>Login</h1>
            <p className={success ? 'correct-message' : 'error-message'}>{message}</p>
            <form id={"form"}>
                <div>
                    <label>
                        <span>@</span>
                    </label>
                    <input type="email" placeholder="Email" value={email} id={"email-input"}
                           onChange={(e) => { setEmail(e.target.value); }}/>
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
                <div className="login-options">
                    {cookies ?
                    <div className="remember-me">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => { setRememberMe(e.target.checked); }}/>
                        <p>Remember me</p>
                    </div> : null}
                    <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <p>New here? <a href={"/register"}>Create an Account</a></p>
        </div>
    );
};

export default Login;