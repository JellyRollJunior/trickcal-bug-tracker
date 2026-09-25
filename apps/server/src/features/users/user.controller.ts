import type { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    GetMeResponse,
    NotFoundError,
} from '@trickcal-bug-tracker/shared';
import { toUserDto } from '@/features/users/user.mapper.js';
import * as userQueries from '@/features/users/user.queries.js';

const getMe = async (
    req: Request,
    res: Response<GetMeResponse>,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();

        const data = await userQueries.getUserById({ id: userId });
        if (!data) throw new NotFoundError('Unable to retieve user');
        res.json(toUserDto(data));
    } catch (error) {
        next(error);
    }
};

export { getMe };
