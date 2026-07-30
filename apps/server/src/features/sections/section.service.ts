import { Board, Section, User } from '@prisma/client';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { computeNewOrder } from '@/lib/ordering/ordering.js';
import * as sectionQueries from '@/features/sections/section.queries.js';

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
    const sections = await sectionQueries.getSections({ boardId });

    // compute order
    const order = computeNewOrder(sections, previousSectionId, nextSectionId);
    const newSection = await sectionQueries.createSection({
        boardId,
        order,
        name,
    });
    return newSection;
};

export { createSection };
