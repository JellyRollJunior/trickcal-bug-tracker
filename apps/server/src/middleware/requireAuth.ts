import type { NextFunction, Request, Response } from 'express';
import { passport } from '@/features/auth/passport/passport.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const tokenAuthMiddleware = passport.authenticate(
        'jwt',
        {session: false},
        (error: Error, user: Express.User | null) => {
            // executed after JwtStrategy. Parameters sent through JwtStrategy done callback
            if (error) return next(error);
            if (!user) return next(new AuthenticationError('Error authenticating token'));

            req.user = user;
            next();
        }
    );
    tokenAuthMiddleware(req, res, next);
};

export { requireAuth }