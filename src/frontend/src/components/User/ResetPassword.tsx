import React, {useState} from 'react';
import '../../style.css';
import {PasswordIcon, VisibilityIcon, VisibilityOff} from "../../icons/icons";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import {useLocation, useNavigate} from "react-router-dom";
import {changePassword} from "../../api/api";

const encodeQueryParams = (params: Record<string, string>) => {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [success, setSuccess] = useState(false);

    const query = useQuery();
    const resetToken = query.get('resetToken');
    if(!resetToken){
        const params = encodeQueryParams({
            errorCode: '400',
            message: 'Invalid token.',
            header: 'Error.'
        });
        window.location.href=`/fallback?${params}`;
        return;
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setSuccess(false);
            return;
        }
        try{
            const response = await changePassword(resetToken, password);
            setMessage(response.message);
            setSuccess(true);
        }catch (error: any){
            setSuccess(false);
            setMessage(`Resetting Password failed. ${error.response?.data?.message || 'Please try again.'}`);
        }
    }

    return (
        <div className="wrapper-auth">
            <h1>Reset your Password</h1>
            <p className={success ? 'correct-message' : 'error-message'}>{message}</p>
            <form id={"form"}>
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
                <div className="password-strengthmeter">
                    <PasswordStrengthMeter password={password}/>
                </div>
                <div className="password-input-wrapper">
                    <label>
                        {PasswordIcon()}
                    </label>
                    <input type={showPassword ? "text" : "password"} placeholder="Repeat Password"
                           value={confirmPassword}
                           onChange={(e) => { setConfirmPassword(e.target.value); }}/>
                    <button type="button" className="password-toggle-button" onClick={toggleShowPassword}>
                        {showPassword ? VisibilityOff() : VisibilityIcon()}
                    </button>
                </div>
                <button type="button" onClick={handleResetPassword}>Change Password</button>
            </form>
        </div>
    )
        ;
};

export default ResetPassword;