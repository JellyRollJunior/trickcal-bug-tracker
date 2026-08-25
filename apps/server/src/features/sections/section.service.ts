import { Board, Section, User } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import {
    assertNullOrInList,
    assertValidOrdering,
    getNextIndexInList,
} from '@/lib/ordering/ordering.js';
import { NotFoundError, ValidationError } from '@trickcal-bug-tracker/shared';
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
    assertNullOrInList(
        previousSectionId,
        sections,
        'Invalid previous section id'
    );

    // assert valid ordering
    const prevSection =
        sections.find((section) => section.id === previousSectionId) ?? null;
    const nextSectionIndex = getNextIndexInList(previousSectionId, sections);
    const nextSection =
        nextSectionIndex !== null ? sections[nextSectionIndex] : null;
    assertValidOrdering(sections, prevSection, nextSection);

    const order = generateKeyBetween(prevSection?.order, nextSection?.order);
    const newSection = await sectionQueries.createSection({
        boardId,
        order,
        name,
    });
    return newSection;
};

const editSection = async ({
    userId,
    sectionId,
    name,
}: {
    userId: User['id'];
    sectionId: Section['id'];
    name: Section['name'];
}) => {
    if (name === undefined) {
        throw new ValidationError({ payload: ['No edits provided'] });
    }
    // assert sectionId exists & assert board access
    const section = await sectionQueries.getSectionById({ sectionId });
    if (!section) throw new NotFoundError('Invalid sectionId');
    await assertBoardAccess({ userId, boardId: section.boardId });

    const updatedSection = await sectionQueries.updateSection({
        sectionId,
        updates: { name },
    });
    return updatedSection;
};

const deleteSection = async ({
    userId,
    sectionId,
}: {
    userId: User['id'];
    sectionId: Section['id'];
}) => {
    // assert sectionId exists & assert board access
    const section = await sectionQueries.getSectionById({ sectionId });
    if (!section) throw new NotFoundError('Invalid sectionId');
    await assertBoardAccess({ userId, boardId: section.boardId });

    const deletedSection = await sectionQueries.deleteSection({ sectionId });
    return deletedSection;
};

export { createSection, editSection, deleteSection };
