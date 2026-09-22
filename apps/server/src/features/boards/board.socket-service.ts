import type { User } from '@prisma/client';
import type { AppServer, AppSocket } from '@/sockets/types.js';
import { JoinRoomInput, UserDto } from '@trickcal-bug-tracker/shared';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { getRoomPresence } from '@/lib/sockets/roomUtils.js';

const joinBoardRoom = async ({
    io,
    socket,
    userId,
    boardId,
}: {
    io: AppServer;
    socket: AppSocket;
    userId: User['id'];
} & JoinRoomInput): Promise<UserDto[]> => {
    await assertBoardAccess({ userId, boardId });

    // switch to room
    socket.rooms.forEach(async (room) => {
        if (room === socket.id || room.includes('user:')) return;
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
        
        // emit board:user-left-room
        const remainingViewers = await getRoomPresence(io, room);
        socket.to(room).emit('board:user-left-room', { userId: socket.data.user.id, viewers: remainingViewers })
    });
    socket.join(boardId);
    console.log(`${socket.id} joined room ${boardId}`);

    socket.data.currentBoardId = boardId;
    const currentViewers = await getRoomPresence(io, boardId);
    return currentViewers;
};

export { joinBoardRoom };
