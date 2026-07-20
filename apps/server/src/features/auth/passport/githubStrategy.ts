import type { VerifyCallback } from 'passport-oauth2';
import passportGithub from 'passport-github2';
import { env } from '@/config/env.js';
import { mapUserToTokenPayload } from '@/features/auth/mapper.js';
import * as userQueries from '@/features/users/queries.js';

const GithubStrategy = passportGithub.Strategy;

const options: passportGithub.StrategyOptions = {
    clientID: env.githubClientId,
    clientSecret: env.githubClientSecret,
    callbackURL: env.githubCallbackUrl,
};
const githubStrategy = new GithubStrategy(
    options,
    async (
        _accessToken: string,
        _refreshToken: string,
        profile: passportGithub.Profile,
        done: VerifyCallback
    ) => {
        try {
            let user = await userQueries.getUserByGithubId({ githubId: profile.id });

            // if no user, create user
            if (!user) {
                user = await userQueries.createGithubUser({
                    githubId: profile.id,
                    name: profile.displayName ?? profile.username,
                });
            }

            const userTokenPayload = mapUserToTokenPayload(user);
            return done(null, userTokenPayload);
        } catch (error) {
            done(error);
        }
    }
);

export { githubStrategy };
