export const validatePassword = (password: string): { valid: boolean, message: string } => {
    const minLength = 8;
    const maxLength = 64;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

    if (password.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long.` };
    }
    if (password.length > maxLength) {
        return { valid: false, message: `Password must be no more than ${maxLength} characters long.` };
    }
    if (!regex.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.' };
    }

    return { valid: true, message: 'Password is valid.' };
};
