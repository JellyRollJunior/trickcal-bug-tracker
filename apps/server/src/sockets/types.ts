import type { Server, Socket } from 'socket.io';
import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from '@trickcal-bug-tracker/shared';

type AppServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

type AppSocket = Socket<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
>;

export { AppServer, AppSocket };
