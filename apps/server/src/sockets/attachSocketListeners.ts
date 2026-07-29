import type { Server } from 'socket.io';
import { socketRequireAuth as requireAuth } from '@/sockets/socketRequireAuth.js';

const attachSocketListeners = (io: Server) => {
    io.use(requireAuth);

    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);
    });
};

export { attachSocketListeners };
