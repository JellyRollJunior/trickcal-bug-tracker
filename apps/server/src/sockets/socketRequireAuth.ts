import type { ExtendedError, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { env } from '@/config/env.js';

const socketRequireAuth = (
    socket: Socket,
    next: (err?: ExtendedError | undefined) => void
) => {
    try {
        // const token = socket.handshake.auth?.token;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3YmU5MzY3LWRiNzctNGRjNy04YTc2LWFhY2ZlOTIyOWUwZiIsIm5hbWUiOiJ1c2FnZXJpbm8iLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzg1NDU3MDEwLCJleHAiOjE3ODgxMzU0MTB9.kBZ3ZcaUg_4tOph0BDV8VpCPkXVIriUKn1Yqt88tlUo'
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
