import type { Section } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { ticketInclude } from '@/features/tickets/ticket.select.js';

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
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch section');
    }
};

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

const editSection = async ({
    sectionId,
    edits,
}: {
    sectionId: Section['id'];
    edits: { name?: Section['name'] };
}) => {
    try {
        const data = await prisma.section.update({
            where: {
                id: sectionId,
            },
            data: edits,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to edit section');
    }
};

export {
    getSectionById,
    getSectionWithTickets,
    getSections,
    createSection,
    editSection,
};
