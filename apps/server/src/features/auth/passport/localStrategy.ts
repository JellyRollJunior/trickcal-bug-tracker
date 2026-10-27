import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import { mapUserToTokenPayload } from '@/features/auth/token.mapper.js';
import { consumeLoginPoints, resetLoginPoints } from '@/lib/rate-limiting/login.limiter.js';
import * as userQueries from '@/features/users/user.queries.js';

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
        const ip = req.ip;
        const data = await userQueries.getUserByUsername({ username: username });
        
        // verify username exists
        if (!data || !data.password) {
            await consumeLoginPoints(ip, username);
            return done(null, false, { message: 'Unable to authenticate credentials', });
        }
        // verify passwords match
        const match = await bcrypt.compare(password, data.password);
        if (!match) {
            await consumeLoginPoints(ip, username);
            return done(null, false, { message: 'Unable to authenticate credentials', });
        }

        await resetLoginPoints(ip, username);
        const userTokenPayload = mapUserToTokenPayload(data);
        return done(null, userTokenPayload);
    } catch (error) {
        return done(error);
    }
});

export { localStrategy }