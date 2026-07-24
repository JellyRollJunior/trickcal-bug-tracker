import type { Board, User } from '@prisma/client';
import type {
    BoardWithParticipants,
    BoardWithSections,
    BoardWithSectionsAndTickets,
} from '@/features/boards/select.js';
import { prisma } from '@/db/prisma.js';
import {
    boardInclude,
    boardWithSectionsInclude,
    boardWithSectionsAndTicketsInclude,
} from '@/features/boards/select.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

const getBoards = async ({
    userId,
}: {
    userId: User['id'];
}): Promise<BoardWithParticipants[]> => {
    try {
        const data = await prisma.board.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            orderBy: { lastUpdate: 'desc' },
            include: boardInclude,
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
}: { userId: User['id'] } & Pick<
    Board,
    'name' | 'description'
>): Promise<BoardWithParticipants> => {
    try {
        const data = await prisma.board.create({
            data: {
                ownerId: userId,
                name: name,
                description: description,
                sections: {
                    create: [
                        { order: 'a0', name: 'Backlog' },
                        { order: 'a1', name: 'In Development' },
                        { order: 'a2', name: 'Testing' },
                        { order: 'a3', name: 'Blocked' },
                        { order: 'a4', name: 'Done' },
                    ],
                },
            },
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create board');
    }
};

const getBoardWithSectionsById = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}): Promise<BoardWithSections | null> => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            include: boardWithSectionsInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

const getBoardWithSectionsAndTicketsById = async ({
    userId,
    boardId,
}: {
    userId: User['id'];
    boardId: Board['id'];
}): Promise<BoardWithSectionsAndTickets | null> => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            include: boardWithSectionsAndTicketsInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

export {
    getBoards,
    createBoard,
    getBoardWithSectionsById,
    getBoardWithSectionsAndTicketsById,
};
