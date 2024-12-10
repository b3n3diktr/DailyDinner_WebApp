import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = "https://daily-dinner.com/api";
//export const apiUrl = "http://192.168.178.194:3000/api";

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
    try {
        const response = await axios.post(
            `${apiUrl}/users/login`,
            { email, password },
            { withCredentials: true }
        );

        const sessionId = response.data?.data;

        if (!sessionId) {
            throw new Error("Session ID not found in response");
        }
        Cookies.set('SESSIONID', sessionId, { secure: true, sameSite: 'strict' });

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};


// Validate user session with session ID
export const auth = async (sessionId: string) => {
    if (!sessionId) {
        throw new Error("Session ID is undefined or empty");
    }
    const response = await axios.post(
        `${apiUrl}/users/validate-session`,
        { sessionId },
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
