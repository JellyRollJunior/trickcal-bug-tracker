import type { AppSocket } from '@/sockets/types.js';
import z, { ZodError } from 'zod';
import {
    BaseError,
    JoinRoomInput,
    joinRoomInputSchema,
    SocketBaseResponse,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { assertBoardAccess } from '@/features/boards/board.services.js';

const joinRoom = async (
    socket: AppSocket,
    input: JoinRoomInput,
    callback: (response: SocketBaseResponse) => void
) => {
    if (typeof callback !== 'function') {
        console.warn(`Socket ${socket.id} called board:join-room without a callback`);
        return;
    }
    try {
        // validate input
        const parsed = z.parse(joinRoomInputSchema, input);
        const { boardId } = { ...parsed };
        // assert board access
        const userId = socket.data.user.id;
        await assertBoardAccess({ userId, boardId });

        // leave all rooms & join room
        socket.rooms.forEach((room) => {
            if (room === socket.id) return;
            socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);
        });
        socket.join(boardId);
        callback({ success: true });
        console.log(`${socket.id} joined room ${boardId}`);
    } catch (error) {
        if (error instanceof ZodError) {
            const validationError = new ValidationError(
                z.flattenError(error).fieldErrors
            );
            callback({ success: false, error: validationError });
        } else {
            callback({ success: false, error: new BaseError() });
        }
    }
};

export { joinRoom };
