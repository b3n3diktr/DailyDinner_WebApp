import {validatePassword} from "../../utils/auth/passwordValidator";
import {sendChangePasswordEmail} from "./utils/emailService";

import User from "../../models/auth/User";
import ResetPassword from "../../models/auth/ResetPassword";

export class changePasswordService {

    async changePassword(resetToken: string, newPassword: string) {
        const resetPasswordModel = await ResetPassword.findOne({resetToken});
        if (!resetPasswordModel) {
            throw new Error('Invalid reset token.');
        }

        const user = await User.findById(resetPasswordModel.userId);
        if (!user) {
            await ResetPassword.findByIdAndDelete(resetPasswordModel._id);
            throw new Error('User not found.');
        }

        const {valid, message} = validatePassword(newPassword);
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
}