import User from "../../models/auth/User";
import {validatePassword} from "../../utils/auth/passwordValidator";
import crypto from "crypto";
import {generateTokenEmail} from "./utils/tokenGenerator";
import {sendActivationEmail} from "./utils/emailService";
import {setupUserDirectoryAndProfilePicture} from "../../routes/user/uploadProfilePictureRoutes";


export class registerService {
    private readonly backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    async registerUser(username: string, email: string, password: string) {
        if (username.length < 1) {
            throw new Error('You need to enter a username.');
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error('Invalid email address.');
        }

        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            throw new Error('Email address already registered.');
        }

        const existingUser = await User.findOne({username});
        if (existingUser) {
            throw new Error('Username already exists.');
        }

        const {valid, message} = validatePassword(password);
        if (!valid) {
            throw new Error(message);
        }
        let uuid;
        let exists;
        do {
            uuid = crypto.randomUUID();
            exists = await User.findOne({uuid});
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
            activationToken,
        });
        await user.save();

        const userId = user._id;
        await setupUserDirectoryAndProfilePicture(uuid);

        const activationLink = `${this.backendUrl}/activate/${activationToken}`;
        await sendActivationEmail(email, activationLink);

        logging.info(`AUTH[Registration] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }
}