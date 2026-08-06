import type { Board } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    NotFoundError,
} from '@trickcal-bug-tracker/shared';
import { boardIdParamSchema } from '@trickcal-bug-tracker/shared';
import { assertBoardAccess, editBoard } from '@/features/boards/board.services.js';
import {
    toBoardDto,
    toBoardWithSectionsAndTicketsDto,
} from '@/features/boards/board.mapper.js';
import * as boardQueries from '@/features/boards/board.queries.js';
import { getIo } from '@/sockets/ioInstance.js';

const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();

        const data = await boardQueries.getBoardsByUserId({ userId });
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
        const { boardId } = boardIdParamSchema.parse(req.params);
        await assertBoardAccess({ userId, boardId });

        const data = await boardQueries.getBoardWithSectionsAndTicketsById({
            boardId,
        });
        if (!data) throw new NotFoundError('Unable to retrieve board');

        res.json(toBoardWithSectionsAndTicketsDto(data));
    } catch (error) {
        next(error);
    }
};

const patchBoard = async (
    req: Request<
        { boardId: Board['id'] },
        {},
        { name?: Board['name']; description?: Board['description'] }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        // validate variables
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId } = boardIdParamSchema.parse(req.params);
        const { name, description } = req.body;
        
        const board = await editBoard({ userId, boardId, name, description })
        
        // emit board edited
        const boardDto = toBoardDto(board);
        const io = getIo();
        io.sockets.to(boardId).emit('board:edited', { board: boardDto });
        
        res.json(boardDto);
    } catch (error) {
        next(error);
    }
};

export { getBoards, postBoards, getBoard, patchBoard };
