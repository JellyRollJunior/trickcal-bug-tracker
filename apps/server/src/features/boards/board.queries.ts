import type { Board, User } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
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

/* Create board with default sections */
const createBoard = async ({
    ownerId,
    name,
    description,
}: { ownerId: User['id'] } & Pick<Board, 'name' | 'description'>) => {
    try {
        const data = await prisma.board.create({
            data: {
                ownerId: ownerId,
                name: name,
                description: description,
                sections: {
                    create: [
                        { order: '1', name: 'Backlog' },
                        { order: '2', name: 'In Development' },
                        { order: '3', name: 'Testing' },
                        { order: '4', name: 'Blocked' },
                        { order: '5', name: 'Done' },
                    ],
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create board');
    }
};

export { getBoards, createBoard };
