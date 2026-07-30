import type { AppSocket } from '@/sockets/types.js';
import z from 'zod';
import { JoinRoomInput, joinRoomInputSchema } from '@trickcal-bug-tracker/shared';
import { assertBoardAccess } from '@/features/boards/board.services.js';

const joinRoom = (socket: AppSocket, input: JoinRoomInput) => {
    try {
        // validate boardId
        const parsed = z.safeParse(joinRoomInputSchema, input);
        if (!parsed.success) {
            // return error response
            console.log('payload error: handle later')
            return 
        }
        const { boardId } = { ...parsed.data };
        // assert board access
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
        console.log('error!')
    }
};

export { joinRoom };
