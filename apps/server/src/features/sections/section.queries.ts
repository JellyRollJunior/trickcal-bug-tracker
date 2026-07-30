import type { Section } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

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

export { getSections, createSection };
