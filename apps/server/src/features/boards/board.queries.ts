import type { Board, Prisma, User } from '@prisma/client';
import type {
    BoardWithParticipants,
    BoardWithSections,
    BoardWithSectionsAndTickets,
} from '@/features/boards/board.select.js';
import { prisma } from '@/db/prisma.js';
import {
    boardInclude,
    boardWithSectionsInclude,
    boardWithSectionsAndTicketsInclude,
} from '@/features/boards/board.select.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

const getBoardsByUserId = async ({
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

const getBoardById = async ({
    boardId,
}: {
    boardId: Board['id'];
}): Promise<BoardWithParticipants | null> => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
            },
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

const getBoardWithSectionsById = async ({
    boardId,
}: {
    boardId: Board['id'];
}): Promise<BoardWithSections | null> => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
            },
            include: boardWithSectionsInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

const getBoardWithSectionsAndTicketsById = async ({
    boardId,
}: {
    boardId: Board['id'];
}): Promise<BoardWithSectionsAndTickets | null> => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
            },
            include: boardWithSectionsAndTicketsInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch board');
    }
};

const updateBoard = async ({
    boardId,
    updates,
}: {
    boardId: Board['id'];
    updates: Pick<Prisma.BoardUpdateInput, 'name' | 'description'>;
}): Promise<BoardWithParticipants> => {
    try {
        const data = await prisma.board.update({
            where: {
                id: boardId,
            },
            data: updates,
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to edit board');
    }
};

const deleteBoard = async ({
    boardId,
}: {
    boardId: Board['id'];
}): Promise<BoardWithParticipants> => {
    try {
        const data = await prisma.board.delete({
            where: {
                id: boardId,
            },
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete board');
    }
};

const addBoardCollaborator = async ({
    boardId,
    collaboratorId,
}: {
    boardId: Board['id'];
    collaboratorId: User['id'];
}): Promise<BoardWithParticipants> => {
    try {
        const data = await prisma.board.update({
            where: {
                id: boardId,
            },
            data: {
                collaborators: {
                    connect: {
                        id: collaboratorId,
                    },
                },
            },
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to add collaborator');
    }
};

const deleteBoardCollaborator = async ({
    boardId,
    collaboratorId,
}: {
    boardId: Board['id'];
    collaboratorId: User['id'];
}) => {
    try {
        const data = await prisma.board.update({
            where: {
                id: boardId,
            },
            data: {
                collaborators: {
                    disconnect: {
                        id: collaboratorId,
                    },
                },
            },
            include: boardInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to remove collaborator');
    }
};

export {
    getBoardsByUserId,
    getBoardWithSectionsById,
    getBoardWithSectionsAndTicketsById,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
    addBoardCollaborator,
    deleteBoardCollaborator,
};
