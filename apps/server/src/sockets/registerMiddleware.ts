import type { Server } from 'socket.io';
import { socketRequireAuth as requireAuth } from '@/sockets/socketRequireAuth.js';

const registerMiddleware = (io: Server) => {
    io.use(requireAuth)
}

export { registerMiddleware }