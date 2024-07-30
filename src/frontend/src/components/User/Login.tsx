import React, { useState } from 'react';
import {login, register} from '../../api/api';
import '../../style.css';
import {PasswordIcon, VisibilityIcon, VisibilityOff} from "../../icons/icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            setMessage(`${response.message}`);
            setSuccess(true);
        } catch (error: any) {
            setMessage(`Login failed. ${error.response.data.message}`);
            setSuccess(false);
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