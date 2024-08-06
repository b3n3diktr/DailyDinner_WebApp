import { sendEmail } from '../../utils/auth/emailSender';

export const sendActivationEmail = async (email: string, activationLink: string) => {
    await sendEmail(email, 'Account Activation', `Click the following link to activate your account: ${activationLink}`);
};

export const sendResetPasswordEmail = async (email: string, resetLink: string) => {
    await sendEmail(email, 'Reset Password', `Click the following link to reset your password: ${resetLink}`);
};

export const sendChangePasswordEmail = async (email: string) => {
    await sendEmail(email, 'Your password changed', `The password of the account with your email has been changed. If this was you, you can just ignore this mail but if not immediately contact us.`);
};