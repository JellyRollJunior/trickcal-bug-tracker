import { AppServer } from '@/sockets/types.js';

const getRoomPresence = async (io: AppServer, roomId: string) => {
    const sockets = await io.in(roomId).fetchSockets();
    return sockets.map((socket) => socket.data.user);
}

export { getRoomPresence };
