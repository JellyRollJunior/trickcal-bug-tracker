import type { VerifyCallback } from 'passport-oauth2';
import passportGoogle from 'passport-google-oauth20';
import { env } from '@/config/env.js';
import { mapUserToTokenPayload } from '@/features/auth/token.mapper.js';
import * as userQueries from '@/features/users/user.queries.js';

const GoogleStrategy = passportGoogle.Strategy;

const options: passportGoogle.StrategyOptions = {
    clientID: env.googleClientId,
    clientSecret: env.googleClientSecret,
    callbackURL: env.googleCallbackUrl,
};
const googleStrategy = new GoogleStrategy(
    options,
    async (
        _accessToken: string,
        _refreshToken: string,
        profile: passportGoogle.Profile,
        done: VerifyCallback
    ) => {
        try {
            let user = await userQueries.getUserByGoogleId({ googleId: profile.id });

            // if no user, create user
            if (!user) {
                user = await userQueries.createGoogleUser({
                    googleId: profile.id,
                    name: profile.displayName ?? profile.name ?? profile.username ,
                });
            }

            const userTokenPayload = mapUserToTokenPayload(user);
            return done(null, userTokenPayload);
        } catch (error) {
            done(error);
        }
    }
);

export { googleStrategy };
