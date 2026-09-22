import type { AppServer, AppSocket } from '@/sockets/types.js';
import {
    JoinRoomInput,
    joinRoomInputSchema,
    SocketJoinRoomResponse,
} from '@trickcal-bug-tracker/shared';
import { socketErrorHandler } from '@/sockets/handlers/socket.error-handler.js';
import { toUserDto } from '@/features/users/user.mapper.js';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { getRoomPresence } from '@/lib/sockets/roomUtils.js';

const joinRoom = async (
    io: AppServer,
    socket: AppSocket,
    input: JoinRoomInput,
    callback: (response: SocketJoinRoomResponse) => void
) => {
    try {
        // validate input
        const parsed = joinRoomInputSchema.parse(input);
        const { boardId } = { ...parsed };
        const userId = socket.data.user.id;

        // validate permissions
        await assertBoardAccess({ userId, boardId });

        // switch to room
        const currentBoardId = socket.data.currentBoardId;
        if (currentBoardId && currentBoardId !== boardId) {
            await socket.leave(currentBoardId);

            const remainingViewers = await getRoomPresence(io, currentBoardId);
            socket.to(currentBoardId).emit('board:user-left-room', {
                userId,
                viewers: remainingViewers,
            });
        }
        await socket.join(boardId);
        console.log(`${socket.id} joined room ${boardId}`);

        // set board data & respond to room joiner
        socket.data.currentBoardId = boardId;
        const currentViewers = await getRoomPresence(io, boardId);
        const mappedViewers = currentViewers.map(toUserDto);
        callback({ success: true, viewers: mappedViewers });

        // emit user joined room
        socket.to(boardId).emit('board:user-joined-room', {
            userId: socket.data.user.id,
            viewers: mappedViewers,
        });
    } catch (error) {
        socketErrorHandler(error, callback);
    }
};

export { joinRoom };
