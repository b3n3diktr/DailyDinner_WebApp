import React from 'react';
import '../../style.css';
import {resetPassword} from "../../api/api";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const[message, setMessage] = React.useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await resetPassword(email);
            setMessage(`${response.message}`);
        }catch (error: any){
            setMessage(`Password reset failed: ${error.response.data.message || 'Please try again.'}`);
        }
    }

    return (
        <div className="wrapper-auth">
            <h1>Forgot Password</h1>
            <p>{message}</p>
            <form id={"form"}>
                <div>
                    <p>Enter the email adress associated with your account and we'll send you a link to reset your
                        password.</p>
                </div>
                <div>
                    <label>
                        <span>@</span>
                    </label>
                    <input type="email" placeholder="Email" value={email} id="emai-input"
                           onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <button type={"button"} onClick={handleForgotPassword}> Submit</button>
            </form>
            <p>New here? <a href={"/register"}>Create an Account</a></p>
        </div>
    );
};

export default ForgotPassword;