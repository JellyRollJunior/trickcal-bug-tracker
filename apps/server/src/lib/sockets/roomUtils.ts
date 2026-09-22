import { AppServer } from '@/sockets/types.js';

const getRoomPresence = async (io: AppServer, roomId: string) => {
    const sockets = await io.in(roomId).fetchSockets();
    const usersInRoomById = new Map(sockets.map((socket) => [socket.data.user.id, socket.data.user]))
    return Array.from(usersInRoomById.values())
}

export { getRoomPresence };
