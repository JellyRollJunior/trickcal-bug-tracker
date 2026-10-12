import type { Section } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { ticketInclude } from '@/features/tickets/ticket.select.js';

const getSections = async ({ boardId }: Pick<Section, 'boardId'>) => {
    try {
        const data = await prisma.section.findMany({
            where: {
                boardId: boardId,
            },
            orderBy: {
                order: 'asc',
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch sections');
    }
};

const getSectionById = async ({ sectionId }: { sectionId: Section['id'] }) => {
    try {
        const data = await prisma.section.findUnique({
            where: {
                id: sectionId,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch section');
    }
};

const getSectionWithTickets = async ({
    sectionId,
}: {
    sectionId: Section['id'];
}) => {
    try {
        const data = await prisma.section.findFirst({
            where: {
                id: sectionId,
            },
            include: {
                tickets: {
                    include: ticketInclude,
                    orderBy: { order: 'asc' },
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch section');
    }
};

const createSection = async ({
    boardId,
    order,
    name,
}: Pick<Section, 'boardId' | 'order' | 'name'>) => {
    try {
        const data = await prisma.section.create({
            data: {
                boardId: boardId,
                order: order,
                name: name,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create section');
    }
};

const updateSection = async ({
    sectionId,
    updates,
}: {
    sectionId: Section['id'];
    updates: { name?: Section['name'] };
}) => {
    try {
        const data = await prisma.section.update({
            where: {
                id: sectionId,
            },
            data: updates,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to edit section');
    }
};

const deleteSection = async ({ sectionId }: { sectionId: Section['id'] }) => {
    try {
        const data = await prisma.section.delete({
            where: {
                id: sectionId,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete sections');
    }
};

export {
    getSections,
    getSectionById,
    getSectionWithTickets,
    createSection,
    updateSection,
    deleteSection,
};
