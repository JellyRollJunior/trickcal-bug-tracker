import { prisma } from '@/db/prisma.js';
import { Section } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

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

export { createSection };
