import type { User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { toUserDto } from '@/features/users/user.mapper.js';
import { passport } from '@/features/auth/passport/passport.js';
import { AuthenticationError, RateLimitError } from '@trickcal-bug-tracker/shared';
import { signToken } from '@/lib/auth/signToken.js';
import * as userQueries from '@/features/users/user.queries.js';
import { loginLimiterByUsername, loginLimiterByIp, IP_FALLBACK_KEY } from '@/lib/rate-limiting/login.limiter.js';
import { RateLimiterRes } from 'rate-limiter-flexible';

const postSignup = async (
    req: Request<{}, {}, Pick<User, 'username' | 'password' | 'name'>>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password ?? '', 10);
        const newUser = await userQueries.createUser({
            username,
            password: hashedPassword,
            name,
        });

        res.json(toUserDto(newUser));
    } catch (error) {
        next(error);
    }
};

/* Authenticate credentials & issue jwt on successful authentication */
const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    // Check limiters before auth -> reject if already blocked
    const { username } = req.body;
    const ip = req.ip;
    try {
        await Promise.all([
            loginLimiterByIp.consume(ip ?? IP_FALLBACK_KEY, 0),
            loginLimiterByUsername.consume(username, 0),
        ]);
    } catch (rateLimiterRes) {
        const secs = Math.round((rateLimiterRes as RateLimiterRes).msBeforeNext / 1000) || 1; // NaN on unexpected error (no crash)
        res.set('Retry-After', String(secs));
        return next(new RateLimitError());
    }

    const authMiddleware = passport.authenticate(
        'local',
        { session: false },
        (
            error: Error | null,
            userTokenPayload: Express.User | false,
            info: { message?: string } | null
        ) => {
            // Executed after LocalStrategy. Parameters sent through LocalStrategy done callback
            if (error) return next(error);
            if (!userTokenPayload) return next(new AuthenticationError(info?.message ?? 'Unable to authenticate user'));
            
            // auth successful - sign token
            const token = signToken(userTokenPayload);
            res.json({ message: 'Authentication success', token });
        }
    );
    authMiddleware(req, res, next);
};

const getGithubCallback = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authMiddleware = passport.authenticate(
        'github',
        (error: Error, user: Express.User, info: { message?: string }) => {
            // Executed after GithubStrategy
            if (error) return next(error);
            if (!user) return next(new AuthenticationError(info?.message ?? 'Unable to authenticate with GitHub'));
            
            const token = signToken(user);
            res.json({ message: 'GitHub authentication success', token })
        }
    );
    authMiddleware(req, res, next);
};

const getGoogleCallback = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authMiddleware = passport.authenticate(
        'google',
        (error: Error, user: Express.User, info: { message?: string }) => {
            // Executed after GoogleStrategy
            if (error) return next(error);
            if (!user) return next(new AuthenticationError(info?.message ?? 'Unable to authenticate with Google'));
            
            const token = signToken(user);
            res.json({ message: 'Google authentication success', token })
        }
    );
    authMiddleware(req, res, next);
};

export { postSignup, postLogin, getGithubCallback, getGoogleCallback };
