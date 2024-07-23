import React, { useState } from 'react';
import {login, register} from '../api/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            setMessage("Login successful.");
        } catch (error: any) {
            if (error.response && error.response.data) {
                setMessage(`Login failed. ${error.response.data}`);
            } else {
                setMessage('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
};

export default Login;
