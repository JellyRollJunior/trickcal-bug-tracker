import type { Server } from 'socket.io';

const attachSocketListeners = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);
    });
};

export { attachSocketListeners };
