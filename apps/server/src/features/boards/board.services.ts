import type { Board, User } from '@prisma/client';
import {
    AuthorizationError,
    NotFoundError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { BoardWithParticipants } from '@/features/boards/board.select.js';
import * as boardQueries from '@/features/boards/board.queries.js';

const assertBoardAccess = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}) => {
    const board = await boardQueries.getBoardById({ boardId });

    // assert board exists && user is owner or collaborator
    if (
        !board ||
        (board.ownerId !== userId &&
            !board.collaborators.some(
                (collaborator) => collaborator.id === userId
            ))
    ) {
        throw new NotFoundError('Unable to fetch board');
    }
};

const editBoard = async ({
    userId,
    boardId,
    name,
    description,
}: {
    userId: User['id'];
    boardId: Board['id'];
    name?: Board['name'];
    description?: Board['description'];
}): Promise<BoardWithParticipants> => {
    await assertBoardAccess({ userId, boardId });
    if (name === undefined && description === undefined) {
        throw new ValidationError({ payload: ['No edits provided'] });
    }

    const board = await boardQueries.editBoard({
        boardId,
        edits: { name, description },
    });
    return board;
};

const deleteBoard = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}): Promise<BoardWithParticipants> => {
    // verify userId owners board
    const board = await boardQueries.getBoardById({ boardId });
    if (!board) throw new NotFoundError('Unable to retrieve board');
    if (board.ownerId !== userId) {
        throw new AuthorizationError('Unable to authorize board');
    }

    const deletedBoard = await boardQueries.deleteBoard({ boardId });
    return deletedBoard;
};

export { assertBoardAccess, editBoard, deleteBoard };
