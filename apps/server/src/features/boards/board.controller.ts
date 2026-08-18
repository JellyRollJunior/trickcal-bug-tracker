import type { Board, User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import {
    AuthenticationError,
    NotFoundError,
    boardIdAndCollaboratorIdParamSchema,
    boardIdParamSchema,
} from '@trickcal-bug-tracker/shared';
import { getIo } from '@/sockets/ioInstance.js';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import {
    toBoardDto,
    toBoardWithSectionsAndTicketsDto,
} from '@/features/boards/board.mapper.js';
import { toUserDto } from '@/features/users/user.mapper.js';
import * as boardQueries from '@/features/boards/board.queries.js';
import * as boardServices from '@/features/boards/board.services.js';

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

        const board = await boardServices.editBoard({ userId, boardId, name, description });

        // emit board edited
        const boardDto = toBoardDto(board);
        const io = getIo();
        io.sockets.to(boardId).emit('board:edited', { board: boardDto });

        res.json(boardDto);
    } catch (error) {
        next(error);
    }
};

const deleteBoard = async (
    req: Request<{ boardId: Board['id'] }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        // validate variables
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId } = boardIdParamSchema.parse(req.params);

        const deletedBoard = await boardServices.deleteBoard({ userId, boardId });
        
        // emit to all collaborators & owner
        const boardDto = toBoardDto(deletedBoard);
        const io = getIo();
        const rooms = boardDto.collaborators.map((user) => `user:${user.id}`).concat(`user:${userId}`);
        io.sockets.to(rooms).emit('board:deleted', { board: boardDto });
        
        res.json(boardDto);
    } catch (error) {
        next(error);
    }
};

const postBoardCollaborator = async (
    req: Request<{ boardId: Board['id'] }, {}, { collaboratorId: User['id']}>,
    res: Response,
    next: NextFunction
) => {
    try {
        // validate variables
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId } = boardIdParamSchema.parse(req.params);
        const { collaboratorId } = req.body

        const { collaborator, board } = await boardServices.addBoardCollaborator({ userId, boardId, collaboratorId })

        // emit to all collaborators & owner & new collaborator
        const boardDto = toBoardDto(board);
        const collaboratorDto = toUserDto(collaborator);
        const io = getIo();
        const rooms = board.collaborators.map((user) => `user:${user.id}`).concat(`user:${boardDto.owner.id}`).concat(`user:${collaboratorDto.id}`)
        io.to(rooms).emit('board:added-collaborator', { user: collaboratorDto, board: boardDto });
        
        res.json(boardDto);
    } catch (error) {
        next(error);
    }
}

const deleteBoardCollaborator = async (
    req: Request<{ boardId: Board['id'] }, {}, { collaboratorId: User['id']}>,
    res: Response,
    next: NextFunction
) => {
    try {
        // validatre variables
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId, collaboratorId } = boardIdAndCollaboratorIdParamSchema.parse(req.params);

        const { collaborator, board } = await boardServices.deleteBoardCollaborator({ userId, boardId, collaboratorId });

        // todo: emit
        const boardDto = toBoardDto(board);

        res.json(boardDto)
    } catch (error) {
        next(error)
    }
}

export {
    getBoards,
    postBoards,
    getBoard,
    patchBoard,
    deleteBoard,
    postBoardCollaborator,
    deleteBoardCollaborator,
};

