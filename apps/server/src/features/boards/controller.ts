import type { Board } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import * as boardQueries from '@/features/boards/board.queries.js';

const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();

        const data = await boardQueries.getBoards({ userId });
        res.json(data);
    } catch (error) {
        next(error);
    }
};

const postBoards = async (
    req: Request<{}, {}, Pick<Board, 'name' | 'description'>>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();

        const payload = { userId, ...req.body };
        const data = await boardQueries.createBoard(payload);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export { getBoards, postBoards };
