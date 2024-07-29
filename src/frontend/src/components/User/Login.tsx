import React, { useState } from 'react';
import {login, register} from '../../api/api';
import '../../style.css';
import {PasswordIcon} from "../../icons/icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

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

    return (
        <div className="wrapper">
            <h1>Login</h1>
            <p className={success ? 'correct-message' : 'error-message'}>{message}</p>
            <form id={"form"}>
                <div>
                    <label htmlFor={"email-input"}>
                        <span>@</span>
                    </label>
                    <input type="email" placeholder="Email" value={email} id={"email-input"}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"password-input"}>
                        {PasswordIcon()}
                    </label>
                    <input type="password" placeholder="Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <p>New here? <a href={"/register"}>Create an Account</a></p>
        </div>
    );
};

export default Login;