import { Board, Section, User } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { assertNullOrInList, assertValidOrdering, getNextIndexInList } from '@/lib/ordering/ordering.js';
import * as sectionQueries from '@/features/sections/section.queries.js';

const createSection = async ({
    userId,
    boardId,
    previousSectionId,
    name,
}: {
    userId: User['id'];
    boardId: Board['id'];
    previousSectionId: Section['id'] | null;
    name: Section['name'];
}) => {
    await assertBoardAccess({ userId, boardId });

    // assert previous section null or exists and in board
    const sections = await sectionQueries.getSections({ boardId });
    assertNullOrInList(previousSectionId, sections, 'Invalid previous section id')

    // assert valid ordering
    const prevSection = sections.find((section) => section.id === previousSectionId) ?? null;
    const nextSectionIndex = getNextIndexInList(previousSectionId, sections);
    const nextSection = nextSectionIndex !== null ? sections[nextSectionIndex] : null;
    assertValidOrdering(sections, prevSection, nextSection);
    
    const order = generateKeyBetween(prevSection?.order, nextSection?.order);
    const newSection = await sectionQueries.createSection({
        boardId,
        order,
        name,
    });
    return newSection;
};

export { createSection };
