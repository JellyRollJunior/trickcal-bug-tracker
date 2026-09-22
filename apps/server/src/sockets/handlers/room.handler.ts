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
        socket.rooms.forEach(async (room) => {
            if (room === socket.id || room.includes('user:')) return;
            await socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);

            // emit board:user-left-room
            const remainingViewers = await getRoomPresence(io, room);
            socket.to(room).emit('board:user-left-room', {
                userId: socket.data.user.id,
                viewers: remainingViewers,
            });
        });
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
