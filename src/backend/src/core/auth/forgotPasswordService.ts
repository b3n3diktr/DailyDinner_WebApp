import {generateTokenEmail} from "./utils/tokenGenerator";
import {sendResetPasswordEmail} from "./utils/emailService";
import User from "../../models/auth/User";
import ResetPassword from "../../models/auth/ResetPassword";

export class forgotPasswordService {
    private readonly backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    async forgotPassword(email: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Could not find an account with the provided email address.');
        }
        if (!user.isActive) {
            throw new Error('Account is not activated. Please activate your account first, before you can reset your password.');
        }

        const userID = user._id;
        const token = generateTokenEmail(email);
        const date = new Date();
        const created = date.toLocaleString();
        const resetPassword = new ResetPassword({
            token: token,
            userId: userID,
            email: email,
            createdAt: created,
            resetToken: ''
        });

        await resetPassword.save();
        await sendResetPasswordEmail(email, `${this.backendUrl}/resetpassword/${token}`);

        logging.info(`AUTH[Forgot Password] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return resetPassword;
    }
}