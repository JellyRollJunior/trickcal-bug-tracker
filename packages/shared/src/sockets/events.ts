import { UserDto } from '../users/user.dto.js';
import { JoinRoomInput } from './joinRoom.js';
import { SocketBaseResponse } from './SocketResponse.js';

type ServerToClientEvents = {
    'board:ticket-moved': () => void;
    'board:user-joined-room': () => void;
};

type ClientToServerEvents = {
    'board:move-ticket': () => void;
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
