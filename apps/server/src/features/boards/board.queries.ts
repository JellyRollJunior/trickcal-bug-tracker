import { prisma } from '@/db/prisma.js';
import { User } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

const getBoards = async ({ id: userId }: Pick<User, 'id'>) => {
    try {
        const data = await prisma.board.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            orderBy: { lastUpdate: 'desc' },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch boards');
    }
};

export { getBoards }