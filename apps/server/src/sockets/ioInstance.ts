import { Server } from 'socket.io';
import { BaseError } from '@trickcal-bug-tracker/shared';
import { AppServer } from '@/sockets/types.js';

let io: Server;

const setIo = (instance: Server) => {
    io = instance;
};

const getIo = (): AppServer => {
    if (!io) {
        throw new BaseError('Socket.IO not initialized');
    }
    return io;
};

export { setIo, getIo };
