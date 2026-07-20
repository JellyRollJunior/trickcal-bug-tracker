import type { TokenPayload } from '@/features/auth/types.js';
import passportJwt from 'passport-jwt';
import { env } from '@/config/env.js';
import { mapUserToTokenPayload } from '@/features/auth/mapper.js';
import * as userQueries from '@/features/users/queries.js';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options: passportJwt.StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.tokenSecret ?? '',
};
const jwtStrategy = new JwtStrategy(
    options,
    async (tokenPayload: TokenPayload, done) => {
        if (!tokenPayload.id) return done(null, false);

        const data = await userQueries.getUserById({ id: tokenPayload.id });
        if (!data) return done(null, false);
        const userTokenPayload = mapUserToTokenPayload(data);
        return done(null, userTokenPayload);
    }
);

export { jwtStrategy };
