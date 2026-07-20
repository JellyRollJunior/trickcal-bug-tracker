import type { User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { mapUserToDto } from '@/features/users/mapper.js';
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

export { postSignup };
