import type { User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import * as userQueries from '@/features/users/queries.js';
import bcrypt from 'bcryptjs';

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

        res.json(newUser);
    } catch (error) {
        next(error);
    }
};

export { postSignup };
