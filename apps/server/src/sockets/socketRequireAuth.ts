import type { ExtendedError, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { env } from '@/config/env.js';

const socketRequireAuth = (
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) throw new Error('Missing token')
        const data = jwt.verify(token, env.tokenSecret);
        socket.data.user = data; // attach user info to socket
        return next();
    } catch (error) {
        console.error('Socket auth failed:', error);
        return next(new AuthenticationError('Unable to authenticate'));
    }
};

export { socketRequireAuth };
