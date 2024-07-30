import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import '../../style.css';
import { register } from "../../api/api";
import { AccountIcon, PasswordIcon, VisibilityIcon, VisibilityOff } from "../../icons/icons";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            if (response && response.message) {
                setMessage(response.message);
                setSuccess(true);
                navigate('/login');
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } catch (error: any) {
            setSuccess(false);
            setMessage(`Registration failed. ${error.response?.data?.message || 'Please try again.'}`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="wrapper-auth">
            <h1>Register</h1>
            <p className={success ? 'correct-message' : 'error-message'}>{message}</p>
            <form id="form">
                <div>
                    <label>
                        {AccountIcon()}
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <span>@</span>
                    </label>
                    <input type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="password-input-wrapper">
                    <label>
                        {PasswordIcon()}
                    </label>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="button" className="password-toggle-button" onClick={toggleShowPassword}>
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <div className="password-strengthmeter">
                    <PasswordStrengthMeter password={password}/>
                </div>
                <div className="password-input-wrapper">
                    <label>
                        {PasswordIcon()}
                    </label>
                    <input type={showPassword ? "text" : "password"}  placeholder="Repeat Password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    <button type="button" className="password-toggle-button" onClick={toggleShowPassword}>
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
            <p>Already have an account? <a href="/login">login</a></p>
        </div>
    );
};

export default Register;
