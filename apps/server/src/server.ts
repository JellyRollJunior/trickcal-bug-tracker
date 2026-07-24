import bcrypt from 'bcryptjs';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui'
import { app } from '@/app.js';
import { env } from '@/config/env.js';

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'https://admin.socket.io'],
        credentials: true,
    },
});

instrument(io, {
    auth: {
        type: 'basic',
        username: env.socketAdminUsername,
        password: await bcrypt.hash(env.socketAdminPassword, 10),
    },
    mode: 'development',
});


server.listen(Number(env.port), '0.0.0.0', () => {
    console.log(`Listening on port: ${env.port}`);
});
