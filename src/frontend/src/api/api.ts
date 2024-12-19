import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "https://daily-dinner.com/api";
//export const apiUrl = "http://localhost:3000/api";

// Register user
export const register = async (username: string, email: string, password: string) => {
    const response = await axios.post(
        `${apiUrl}/users/register`,
        { username, password, email},
        { withCredentials: true }
    );
    return response.data;
};

//Activate Account
export const activate = async (token: string) => {
    const response = await axios.get(
        `${apiUrl}/users/activate/${token}`,
        { withCredentials: true }
    );
    return response.data;
}

// Login user and store session token
export const login = async (email: string, password: string) => {
        const response = await axios.post(
            `${apiUrl}/users/login`,
            { email, password },
            { withCredentials: true }
        );
        Cookies.set('loggedIn', "true", { expires: 7 });

        return response.data;
};

//Logout user
export const logout = async () => {
    const response = await axios.post(
        `${apiUrl}/users/logout`,
        { withCredentials: true }
    );
    return response.data;
};

// Validate user session with session ID
export const auth = async () => {
    const response = await axios.post(
        `${apiUrl}/users/validate-session`,
        {},
        { withCredentials: true },
    );
    return response.data;
};




// Reset password request
export const requestPasswordReset = async (email: string) => {
    const response = await axios.post(
        `${apiUrl}/users/password-reset-request`,
        { email },
        { withCredentials: true }
    );
    return response.data;
};

// Change password with a reset token
export const resetPassword = async (token: string, password: string) => {
    const response = await axios.post(
        `${apiUrl}/users/reset-password`,
        { token, password },
        { withCredentials: true }
    );
    return response.data;
};

// Upload profile picture
export const uploadProfilePicture = async (uuid: string, profilePicture: File) => {
    const formData = new FormData();
    formData.append('uuid', uuid);
    formData.append('profile', profilePicture);

    const response = await axios.post(
        `${apiUrl}/user/upload-profile-picture`,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        }
    );
    return response.data;
};

// Get profile picture as a blob URL
export const getProfilePicture = async (uuid: string): Promise<string> => {
    try {
        const response = await axios.get(
            `${apiUrl}/user/profile-picture/${uuid}`,
            {
                responseType: 'blob',
                withCredentials: true
            }
        );
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        throw error;
    }
};
