import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "http://192.168.178.156:1337/api";

export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, { username, email, password });
    console.log(response.data);
    console.log(response);
    return response.data;
};

export const login = async (email: string, password: string, remember: boolean) => {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password, remember });
    const token = response.data.token;
    Cookies.set('sessionID', token, { expires: (remember ? 14: 1) });
    console.log(response.data);
    console.log(response);
    return response.data;
};

export const auth = async (token: string) => {
    const response = await axios.post(`${apiUrl}/auth/validate`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    console.log(response);
    return response.data;
};

export const resetPassword = async (email: string) => {
    const response = await axios.post(`${apiUrl}/auth/forgotpassword`, {email});
    return response.data;
}

export const changePassword = async (resetToken: string, newPassword: string) => {
    const response = await axios.post(`${apiUrl}/auth/changepassword`, {resetToken, newPassword});
    return response.data;
}

axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get('sessionID')}`;
