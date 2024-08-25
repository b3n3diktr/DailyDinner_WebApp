import User from "../../models/auth/User";

export class activateUserService {

    async activateUser(token: string) {
        const user = await User.findOne({activationToken: token});

        if (!user) {
            throw new Error('Invalid token.');
        }
        if (user.isActive) {
            throw new Error('Account already active.');
        }

        user.isActive = true;
        user.activationToken = '';
        await user.save({validateBeforeSave: true});

        logging.info(`AUTH[Activation] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }

}