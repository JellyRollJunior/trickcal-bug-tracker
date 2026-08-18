import type { Board, User } from '@prisma/client';
import {
    AuthorizationError,
    BaseError,
    NotFoundError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { BoardWithParticipants } from '@/features/boards/board.select.js';
import * as boardQueries from '@/features/boards/board.queries.js';
import * as userQueries from '@/features/users/user.queries.js';

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

const assertBoardOwner = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}): Promise<BoardWithParticipants> => {
    const board = await boardQueries.getBoardById({ boardId });

    if (!board) throw new NotFoundError('Unable to retrieve board');
    if (board.ownerId !== userId) {
        throw new AuthorizationError('Unable to authorize board');
    }
    return board;
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
    await assertBoardOwner({ userId, boardId });

    const deletedBoard = await boardQueries.deleteBoard({ boardId });
    return deletedBoard;
};

const addBoardCollaborator = async ({
    userId,
    boardId,
    collaboratorId,
}: {
    userId: User['id'];
    boardId: Board['id'];
    collaboratorId: User['id'];
}): Promise<{ collaborator: User, board: BoardWithParticipants }> => {
    // assert userId is owner, collaboratorId is not already collaborator, collaboratorId is real user 
    const board = await assertBoardOwner({ userId, boardId });
    if (board.collaborators.some((user) => user.id === collaboratorId)) {
        throw new BaseError('Conflict error', 'User already a collaborator', 409);
    }
    const collaborator = await userQueries.getUserById({ id: collaboratorId });
    if (!collaborator) throw new NotFoundError('Unable to retrieve user using collaboratorId');

    const boardWithNewCollaborator = await boardQueries.addBoardCollaborator({ boardId, collaboratorId });
    return { collaborator, board: boardWithNewCollaborator};
};

const deleteBoardCollaborator = async ({
    userId,
    boardId,
    collaboratorId,
}: {
    userId: User['id'];
    boardId: Board['id'];
    collaboratorId: User['id'];
}) => {
    // assert userId is owner, collaboratorId is a collaborator, collaboratorId is real user 
    const board = await assertBoardOwner({ userId, boardId });
    if (!board.collaborators.some((user) => user.id === collaboratorId)) {
        throw new BaseError('Conflict error', 'User corresponding to collaboratorId is not a collaborator', 409);
    }
    const collaborator = await userQueries.getUserById({ id: collaboratorId });
    if (!collaborator) throw new NotFoundError('Unable to retrieve user using collaboratorId');

    const boardWithoutCollaborator = await boardQueries.deleteBoardCollaborator({ boardId, collaboratorId });
    return { collaborator, board: boardWithoutCollaborator };
};

export {
    assertBoardAccess,
    editBoard,
    deleteBoard,
    addBoardCollaborator,
    deleteBoardCollaborator,
};
