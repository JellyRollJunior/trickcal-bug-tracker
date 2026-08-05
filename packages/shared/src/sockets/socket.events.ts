import { UserDto } from '../features/users';
import {
    JoinRoomInput,
    MoveTicketInput,
} from './socket.client-to-server.schema.js';
import {
    TicketMovedPayload,
    UserJoinedPayload,
} from './socket.server-client.schema.js';
import {
    SocketBaseResponse,
    SocketJoinRoomResponse,
} from './socket.response.js';
import { BoardDto } from '../features/boards';

type ServerToClientEvents = {
    'board:user-joined-room': (payload: UserJoinedPayload) => void;
    'ticket:moved': (payload: TicketMovedPayload) => void;
};

type ClientToServerEvents = {
    'board:join-room': (
        input: JoinRoomInput,
        callback: (response: SocketJoinRoomResponse) => void
    ) => void;
    'ticket:move': (
        input: MoveTicketInput,
        callback: (response: SocketBaseResponse) => void
    ) => void;
    'disconnect': () => void;
};

type InterServerEvents = {};

type SocketData = {
    user: UserDto;
};

export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
};
