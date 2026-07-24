import type { Server } from 'node:http';
import bcrypt from 'bcryptjs';
import { Server as SocketIoServer } from 'socket.io';
import { instrument } from '@socket.io/admin-ui'
import { env } from '@/config/env.js';
import { attachSocketListeners } from '@/sockets/attachSocketListeners.js';

const configureSocketIo = async (server: Server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: [
                'http://localhost:3000',
                'http://localhost:5173',
                'https://admin.socket.io',
            ],
            credentials: true,
        },
    });

    // Setup admin ui
    instrument(io, {
        auth: {
            type: 'basic',
            username: env.socketAdminUsername,
            password: await bcrypt.hash(env.socketAdminPassword, 10),
        },
        mode: 'development',
    });

    attachSocketListeners(io);
};

export { configureSocketIo }