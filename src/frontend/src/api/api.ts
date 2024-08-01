import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "http://192.168.178.156:3000/api"; // Update with your backend URL

// Set default Axios configurations
axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl;

const token = Cookies.get('authToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Register User
export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post('/auth/register', { username, email, password });
    return response.data;
};

// Login User
export const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    const token = response.data.token;
    Cookies.set('authToken', token, { expires: 1 }); // expires in 1 day
    return response.data;
};
