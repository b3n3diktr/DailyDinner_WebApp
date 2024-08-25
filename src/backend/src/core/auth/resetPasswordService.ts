import User from "../../models/auth/User";
import ResetPassword from "../../models/auth/ResetPassword";
import crypto from "crypto";


export class resetPasswordService {

    async resetPassword(token: string) {
        const resetPasswordModel = await ResetPassword.findOne({token: token});
        if (!resetPasswordModel) {
            throw new Error('Invalid token. Please try again.1');
        }
        const user = await User.findOne({email: resetPasswordModel.email});
        if (!user) {
            await ResetPassword.findOneAndDelete({token: token});
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
}