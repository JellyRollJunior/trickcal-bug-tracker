import type { Board } from '@prisma/client';
import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from '@trickcal-bug-tracker/shared';
import type { Socket } from 'socket.io';
import { assertBoardAccess } from '@/features/boards/board.services.js';

const joinRoom = (
    socket: Socket<
        ServerToClientEvents,
        ClientToServerEvents,
        InterServerEvents,
        SocketData
    >,
    boardId: Board['id']
) => {
    try {
        // validate boardId & assert board access
        const userId = socket.data.user.id;
        assertBoardAccess({ userId, boardId });

        // leave all rooms & join room
        socket.rooms.forEach((room) => {
            socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);
        });
        socket.join(boardId);
        console.log(`${socket.id} joined room ${boardId}`);
    } catch (error) {
        // handle error
    }
};

export { joinRoom };
