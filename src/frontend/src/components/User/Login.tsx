import React, { useState } from 'react';
import {login, register} from '../../api/api';
import '../../style.css';

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
        <div className="auth-container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <p>                {message && (
                <p className={`message ${success ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}</p>
        </div>
    );
};

export default Login;