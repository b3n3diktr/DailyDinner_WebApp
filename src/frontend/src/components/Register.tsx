import React, { useState } from 'react';
import { register } from '../api/api';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleRegister = async () => {
        try {
            await register(username, email, password);
            setMessage('Registration successful. Check your email to activate your account.');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setMessage(`Registration failed. ${error.response.data}`);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
};

export default Register;
