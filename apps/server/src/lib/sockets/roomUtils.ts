import { AppSocket } from '@/sockets/types.js';

const switchToRoom = (socket: AppSocket, roomId: string) => {
    socket.rooms.forEach((room) => {
        if (room === socket.id) return;
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
    });
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
};

export { switchToRoom };
