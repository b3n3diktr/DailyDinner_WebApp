import User from "../../models/auth/User";


export class validateSessionIdService {

    async validateSession(uuid: string) {
        const user = await User.findOne({uuid: uuid});

        if (!user) {
            throw new Error('Invalid token.');
        }

        logging.info(`AUTH[Validate] - USERNAME: [${user.username}] - USERID: [${user._id}] - EMAIL: [${user.email}]`);
        return user;
    }
}