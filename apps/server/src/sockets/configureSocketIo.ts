import type { Server } from 'node:http';
import type {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from '@trickcal-bug-tracker/shared';
import bcrypt from 'bcryptjs';
import { Server as SocketIoServer } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { env } from '@/config/env.js';
import { setIo } from '@/sockets/ioInstance.js';
import { registerMiddleware } from '@/sockets/registerMiddleware.js';
import { registerEventHandlers } from '@/sockets/registerEventHandlers.js';

const configureSocketIo = async (server: Server) => {
    const io = new SocketIoServer<
        ServerToClientEvents,
        ClientToServerEvents,
        InterServerEvents,
        SocketData
    >(server, {
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

    // config socket
    registerMiddleware(io);
    registerEventHandlers(io);
    setIo(io);
};

export { configureSocketIo };
