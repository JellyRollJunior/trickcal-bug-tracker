import type { Board, Section } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    NotFoundError,
} from '@trickcal-bug-tracker/shared';
import { toSectionDto } from '@/features/boards/mapper.js';
import * as boardQueries from '@/features/boards/board.queries.js';
import * as sectionQueries from '@/features/boards/section.queries.js';

const postSection = async (
    req: Request<{ boardId: Board['id'] }, {}, Pick<Section, 'order' | 'name'>>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const boardId = req.params.boardId;
        const { order, name } = { ...req.body };

        // board permission check
        const board = await boardQueries.getBoardById({ userId, boardId });
        if (!board) throw new NotFoundError('Unable to create section');

        const newSection = await sectionQueries.createSection({
            boardId,
            order,
            name,
        });
        res.json(toSectionDto(newSection));
    } catch (error) {
        next(error);
    }
};

export { postSection };
