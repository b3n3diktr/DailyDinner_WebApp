import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "http://192.168.178.156:3000/api";

export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, { username, email, password }, { withCredentials: true });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password }, { withCredentials: true });
    return response.data;
};

axios.defaults.withCredentials = true; // Include cookies with every request

// Usage of protected routes
export const getProtectedData = () => {
    return axios.get(`${apiUrl}/auth/protected`, { withCredentials: true });
};
