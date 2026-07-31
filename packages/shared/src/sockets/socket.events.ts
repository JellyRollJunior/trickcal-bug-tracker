import { UserDto } from '../features/users/user.dto.js';
import { JoinRoomInput, MoveTicketInput } from './socket.request.schema.js';
import { SocketBaseResponse } from './socket.response.js';

type ServerToClientEvents = {
    'ticket:moved': () => void;
    'board:user-joined-room': () => void;
};

type ClientToServerEvents = {
    'ticket:move': (
        input: MoveTicketInput,
        callback: (response: SocketBaseResponse) => void
    ) => void;
    'board:join-room': (
        input: JoinRoomInput,
        callback: (response: SocketBaseResponse) => void
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
