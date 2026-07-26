import { Server } from 'socket.io';
import { BaseError } from '@trickcal-bug-tracker/shared';

let io: Server;

const setIo = (instance: Server) => {
    io = instance;
};

const getIo = (): Server => {
    if (!io) {
        throw new BaseError('Socket.IO not initialized');
    }
    return io;
};

export { setIo, getIo };
