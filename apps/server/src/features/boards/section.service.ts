import { Board, Section, User } from '@prisma/client';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { computeNewOrder } from '@/features/boards/ordering.service.js';
import { NotFoundError } from '@trickcal-bug-tracker/shared';
import * as boardQueries from '@/features/boards/board.queries.js';
import * as sectionQueries from '@/features/boards/section.queries.js';

const createSection = async ({
    userId,
    boardId,
    previousSectionId,
    nextSectionId,
    name,
}: {
    userId: User['id'];
    boardId: Board['id'];
    previousSectionId: Section['id'] | null;
    nextSectionId: Section['id'] | null;
    name: Section['name'];
}) => {
    await assertBoardAccess({ userId, boardId });
    const board = await boardQueries.getBoardWithSectionsById({
        boardId,
    });
    if (!board) throw new NotFoundError('Unable to create section');

    // compute order
    const order = computeNewOrder(
        board.sections,
        previousSectionId,
        nextSectionId
    );
    const newSection = await sectionQueries.createSection({
        boardId,
        order,
        name,
    });
    return newSection;
};

export { createSection };
