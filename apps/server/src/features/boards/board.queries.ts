import type { Board, User } from '@prisma/client';
import { prisma } from '@/db/prisma.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { boardSelect, boardSummarySelect } from '@/features/boards/select.js';

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
            select: boardSummarySelect,
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
            select: boardSummarySelect,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create board');
    }
};

const getBoardById = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}) => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            select: boardSelect,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

export { getBoards, createBoard, getBoardById };
