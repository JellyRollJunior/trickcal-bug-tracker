import type { Board, User } from '@prisma/client';
import { NotFoundError } from '@trickcal-bug-tracker/shared';
import * as boardQueries from '@/features/boards/board.queries.js';

const assertBoardAccess = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}) => {
    const board = await boardQueries.getBoardById({ boardId });

    // asset board exists && user is owner or collaborator
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

export { assertBoardAccess }