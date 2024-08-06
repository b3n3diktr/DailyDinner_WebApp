import {validatePassword} from "../../utils/auth/passwordValidator";
import {generateSessionID, generateTokenEmail} from "./tokenGenerator";
import {sendActivationEmail, sendChangePasswordEmail, sendResetPasswordEmail} from "./emailService";

import User from "../../models/auth/User";
import ResetPassword from "../../models/auth/ResetPassword";
import crypto from "crypto";


export class authService {
    private readonly backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }



    /* Register */
    async registerUser(username: string, email: string, password: string) {
        if (username.length < 1) {
            throw new Error('You need to enter a username.');
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error('Invalid email address.');
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw new Error('Email address already registered.');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists.');
        }

        const { valid, message } = validatePassword(password);
        if (!valid) {
            throw new Error(message);
        }
        let uuid;
        let exists;
        do {
            uuid = crypto.randomUUID();
            exists = await User.findOne({ uuid });
        } while (exists);

        const date = new Date();
        const created = date.toLocaleString();
        const activationToken = generateTokenEmail(email);
        const user = new User({
            username,
            email,
            password,
            isActive: false,
            uuid,
            created,
            activationToken
        });
        await user.save();

        const activationLink = `${this.backendUrl}/activate/${activationToken}`;
        await sendActivationEmail(email, activationLink);

        logging.info(`AUTH[Registration] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }


    /* Activate User */
    async activateUser(token: string) {
        const user = await User.findOne({ activationToken: token });

        if (!user) {
            throw new Error('Invalid token.');
        }
        if (user.isActive) {
            throw new Error('Account already active.');
        }

        user.isActive = true;
        user.activationToken = '';
        await user.save({ validateBeforeSave: true });

        logging.info(`AUTH[Activation] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }



    /* Resend Activation Token */
    async resendActivationEmail(token: string) {
        const user = await User.findOne({ activationToken: token });
        if (!user) {
            throw new Error('Invalid token.');
        }
        const email = user.email;
        const activationToken = generateTokenEmail(email);
        const activationLink = `${this.backendUrl}/activate/${activationToken}`;
        await sendActivationEmail(email, activationLink);

        if (!user) {
            throw new Error('Invalid token.');
        }
        user.activationToken = activationToken;
        await user.save({ validateBeforeSave: false });

        logging.info(`AUTH[Resend Activation Email] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }


    /* Login User*/
    async loginUser(email: string, password: string, remember: boolean) {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const uuid = user.uuid;

        if (!user.isActive) {
            throw new Error('Account is not activated. Please check your emails for the activation link.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password.');
        }

        const token = generateSessionID(uuid, remember);
        logging.info(`AUTH[Login] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return { token, userId: user._id };
    }



    /* Validate sessionID */
    async validateSession(uuid: string) {
        const user = await User.findOne({uuid: uuid});

        if (!user) {
            throw new Error('Invalid token.');
        }

        logging.info(`AUTH[Validate] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }



    /* Change Password */
    async changePassword(resetToken: string, newPassword: string) {
        const resetPasswordModel = await ResetPassword.findOne({ resetToken });
        if (!resetPasswordModel) {
            throw new Error('Invalid reset token.');
        }

        const user = await User.findById(resetPasswordModel.userId);
        if (!user) {
            await ResetPassword.findByIdAndDelete(resetPasswordModel._id);
            throw new Error('User not found.');
        }

        const { valid, message } = validatePassword(newPassword);
        if (!valid) {
            throw new Error(message);
        }

        user.password = newPassword;
        await user.save();
        await ResetPassword.findByIdAndDelete(resetPasswordModel._id);
        await sendChangePasswordEmail(user.email);

        logging.info(`AUTH[Change Password] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }



    /* Reset Password */
    async resetPassword(token: string) {
        const resetPasswordModel = await ResetPassword.findOne({ token: token });
        if (!resetPasswordModel) {
            throw new Error('Invalid token. Please try again.1');
        }
        const user = await User.findOne({email: resetPasswordModel.email});
        if (!user) {
            await ResetPassword.findOneAndDelete({ token: token });
            throw new Error('Invalid token. Please try again.2');
        }

        let resetToken = resetPasswordModel?.resetToken;
        if (!resetToken) {
            resetToken = crypto.randomBytes(32).toString('hex');
            resetPasswordModel.resetToken = resetToken;
            await resetPasswordModel.save();
        }

        logging.info(`AUTH[Password Reset] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return resetToken;
    }



    /* Forgot Password */
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