import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import '../../style.css';
import { register } from "../../api/api";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setSuccess(false);
            return;
        }
        try {
            const response = await register(username, email, password);
            setMessage(`${response.message}`);
            setSuccess(true);
        } catch (error: any) {
                setSuccess(false);
            if (error.response && error.response.data) {
                setMessage(`Registration failed. ${error}`);
            }else{
                setMessage(`Registration failed. Please try again.`);
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <PasswordStrengthMeter password={password} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {message && (
                    <p className={`message ${success ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;