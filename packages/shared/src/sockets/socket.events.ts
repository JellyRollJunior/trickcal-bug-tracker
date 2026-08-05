import { UserDto } from '../features/users';
import { JoinRoomInput, MoveTicketInput } from './socket.client-to-server.schema.js';
import { TicketMovedPayload } from './socket.server-client.schema.js';
import { SocketBaseResponse, SocketJoinRoomResponse } from './socket.response.js';

type ServerToClientEvents = {
    'ticket:moved': (input : TicketMovedPayload) => void;
    'board:user-joined-room': () => void;
};

type ClientToServerEvents = {
    'ticket:move': (
        input: MoveTicketInput,
        callback: (response: SocketBaseResponse) => void
    ) => void;
    'board:join-room': (
        input: JoinRoomInput,
        callback: (response: SocketJoinRoomResponse) => void
    ) => void;
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
