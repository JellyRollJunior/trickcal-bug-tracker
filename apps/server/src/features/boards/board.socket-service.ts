import type { User } from '@prisma/client';
import type { AppSocket } from '@/sockets/types.js';
import { JoinRoomInput } from '@trickcal-bug-tracker/shared';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { switchToRoom } from '@/lib/sockets/roomUtils.js';

const joinBoardRoom = async ({
    socket,
    userId,
    boardId,
}: {
    socket: AppSocket;
    userId: User['id'];
} & JoinRoomInput) => {
    await assertBoardAccess({ userId, boardId });
    switchToRoom(socket, boardId);
};

export { joinBoardRoom };
