import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import { mapUserToTokenPayload } from '@/features/auth/mapper.js';
import * as userQueries from '@/features/users/queries.js';

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const data = await userQueries.getUserByUsername({ username: username });
        
        // verify username exists
        if (!data || !data.password) {
            return done(null, false, { message: 'Unable to authenticate credentials', });
        }
        // verify passwords match
        const match = await bcrypt.compare(password, data.password);
        if (!match) {
            return done(null, false, { message: 'Unable to authenticate credentials', });
        }

        const userTokenPayload = mapUserToTokenPayload(data);
        return done(null, userTokenPayload);
    } catch (error) {
        return done(error);
    }
});

export { localStrategy }