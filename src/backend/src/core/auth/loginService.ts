import {generateSessionID} from "./utils/tokenGenerator";
import User from "../../models/auth/User";

export class loginService {
    private readonly backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

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
}