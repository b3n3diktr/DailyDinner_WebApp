import axios from 'axios';

const apiUrl = "http://localhost:3000/api";
export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/register`, { username, email, password });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
    return response.data;
};

