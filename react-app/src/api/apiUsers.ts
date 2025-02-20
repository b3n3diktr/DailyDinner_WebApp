import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    //baseURL: 'http://localhost:3000/api/users',
    baseURL: "https://daily-dinner.com/api/users",
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export class ApiUsers {
    // Register user
    static async register(username: string, email: string, password: string) {
        const response = await apiClient.post('/users/register', { username, email, password });
        return response.data;
    }

    // Activate user registration
    static async activate(token: string) {
        const response = await apiClient.get(`/users/activate/${token}`);
        return response.data;
    }

    // Login user and store session token
    static async login(email: string, password: string) {
        const response = await apiClient.post('/users/login', { email, password });
        Cookies.set('loggedIn', 'true', { expires: 7 });
        return response.data;
    }

    // Logout user
    static async logout() {
        const response = await apiClient.post('/users/logout');
        Cookies.remove('loggedIn');
        Cookies.remove('uuid');
        return response.data;
    }

    // Validate user session
    static async auth() {
        const response = await apiClient.post('/users/validate-session');
        Cookies.set('uuid', response.data.data.id, { expires: 7 });
        return response.data;
    }

    // Request password reset
    static async requestPasswordReset(email: string) {
        const response = await apiClient.post('/users/password-reset-request', { email });
        return response.data;
    }

    // Reset password with a token
    static async resetPassword(token: string, password: string) {
        const response = await apiClient.post('/users/reset-password', { token, password });
        return response.data;
    }

    // Upload profile picture
    static async uploadProfilePicture(uuid: string, profilePicture: File) {
        const formData = new FormData();
        formData.append('uuid', uuid);
        formData.append('profile', profilePicture);

        const response = await apiClient.post('/users/upload-profile-picture', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    // Get profile picture as a blob
    static async getProfilePicture(uuid: string): Promise<string> {
        try {
            const response = await apiClient.get(`/users/profile-picture/${uuid}`, { responseType: 'blob' });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            throw error;
        }
    }
}
