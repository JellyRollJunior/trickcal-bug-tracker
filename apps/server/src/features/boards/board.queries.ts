import type { Board, User } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { boardInclude } from '@/features/boards/select.js';

const getBoards = async ({ userId }: { userId: User['id'] }) => {
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
    userId,
    name,
    description,
}: { userId: User['id'] } & Pick<Board, 'name' | 'description'>) => {
    try {
        const data = await prisma.board.create({
            data: {
                ownerId: userId,
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

const getBoardById = async ({ boardId }: { boardId: Board['id'] }) => {
    try {
        const data = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
            include: boardInclude
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

export { getBoards, createBoard, getBoardById };
