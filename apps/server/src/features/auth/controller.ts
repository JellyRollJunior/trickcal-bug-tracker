import type { User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { mapUserToDto } from '@/features/users/mapper.js';
import { passport } from '@/features/auth/passport/passport.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { signToken } from '@/features/auth/passport/signToken.js';
import * as userQueries from '@/features/users/queries.js';

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

        res.json(mapUserToDto(newUser));
    } catch (error) {
        next(error);
    }
};

/* Authenticate credentials & issue jwt on successful authentication */
const postLogin = async (req: Request, res: Response, next: NextFunction) => {
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
        { failureRedirect: '/' },
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

export { postSignup, postLogin, getGithubCallback };
