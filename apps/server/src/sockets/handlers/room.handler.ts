import type { AppSocket } from '@/sockets/types.js';
import z, { ZodError } from 'zod';
import {
    BaseError,
    JoinRoomInput,
    joinRoomInputSchema,
    SocketBaseResponse,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { joinBoardRoom } from '@/features/boards/board.socket-service.js';

const joinRoom = async (
    socket: AppSocket,
    input: JoinRoomInput,
    callback: (response: SocketBaseResponse) => void
) => {
    // validate callback
    if (typeof callback !== 'function') {
        console.warn(
            `Socket ${socket.id} called board:join-room without a callback`
        );
        return;
    }
    try {
        // validate input
        const parsed = z.parse(joinRoomInputSchema, input);
        const { boardId } = { ...parsed };
        const userId = socket.data.user.id;

        await joinBoardRoom({ socket, userId, boardId });
        callback({ success: true });
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
