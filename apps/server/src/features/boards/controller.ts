import type { Board } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    NotFoundError,
} from '@trickcal-bug-tracker/shared';
import * as boardQueries from '@/features/boards/board.queries.js';
import {
    toBoardDto,
    toBoardWithSectionsAndTicketsDto,
} from '@/features/boards/mapper.js';

const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();

        const data = await boardQueries.getBoards({ userId });
        res.json(data.map(toBoardDto));
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
        res.json(toBoardDto(data));
    } catch (error) {
        next(error);
    }
};

const getBoard = async (
    req: Request<{ boardId: Board['id'] }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const boardId = req.params.boardId;

        const data = await boardQueries.getBoardById({ userId, boardId });
        if (!data) throw new NotFoundError('Unable to retrieve board');

        res.json(toBoardWithSectionsAndTicketsDto(data));
    } catch (error) {
        next(error);
    }
};

export { getBoards, postBoards, getBoard };
