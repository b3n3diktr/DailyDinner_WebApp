import {generateTokenEmail} from "./utils/tokenGenerator";
import {sendActivationEmail} from "./utils/emailService";

import User from "../../models/auth/User";


export class resendActivationEmailService {
    private readonly backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    async resendActivationEmail(token: string) {
        const user = await User.findOne({activationToken: token});
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
        await user.save({validateBeforeSave: false});

        logging.info(`AUTH[Resend Activation Email] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }

}