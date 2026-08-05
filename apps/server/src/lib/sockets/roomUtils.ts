import { AppServer, AppSocket } from '@/sockets/types.js';

const switchToRoom = (socket: AppSocket, roomId: string) => {
    socket.rooms.forEach((room) => {
        if (room === socket.id) return;
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
    });
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
};

const getRoomPresence = async (io: AppServer, roomId: string) => {
    const sockets = await io.in(roomId).fetchSockets();
    const usersInRoomById = new Map(sockets.map((socket) => [socket.data.user.id, socket.data.user]))
    return Array.from(usersInRoomById.values())
}

export { switchToRoom, getRoomPresence };
