import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "http://192.168.178.156:3000/api";

export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, { username, email, password });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
    const token = response.data.token;
    Cookies.set('sessionID', token, { expires: 14 });
    return response.data;
};

export const auth = async (token: string) => {
    const response = await axios.post(`${apiUrl}/auth/validate`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('sessionID')}`;
