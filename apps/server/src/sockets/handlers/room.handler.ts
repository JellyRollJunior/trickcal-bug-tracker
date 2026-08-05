import type { AppServer, AppSocket } from '@/sockets/types.js';
import {
    JoinRoomInput,
    joinRoomInputSchema,
    SocketJoinRoomResponse,
} from '@trickcal-bug-tracker/shared';
import { joinBoardRoom } from '@/features/boards/board.socket-service.js';
import { socketErrorHandler } from '@/sockets/handlers/socket.error-handler.js';
import { toUserDto } from '@/features/users/user.mapper.js';

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

        const currentViewers = await joinBoardRoom({ io, socket, userId, boardId });
        const mappedViewers = currentViewers.map(toUserDto)
        callback({ success: true, viewers: mappedViewers });

        // emit user joined room
        socket.to(boardId).emit('board:user-joined-room', { user: toUserDto(socket.data.user) })
    } catch (error) {
        socketErrorHandler(error, callback);
    }
};

export { joinRoom };
