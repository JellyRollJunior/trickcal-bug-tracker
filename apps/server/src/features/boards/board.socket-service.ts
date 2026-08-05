import type { User } from '@prisma/client';
import type { AppServer, AppSocket } from '@/sockets/types.js';
import { JoinRoomInput, UserDto } from '@trickcal-bug-tracker/shared';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { getRoomPresence, switchToRoom } from '@/lib/sockets/roomUtils.js';

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
    
    switchToRoom(socket, boardId);
    socket.data.currentBoardId = boardId;
    
    const currentViewers = await getRoomPresence(io, boardId);
    return currentViewers;
};

export { joinBoardRoom };
