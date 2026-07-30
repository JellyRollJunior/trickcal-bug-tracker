import { UserDto } from '../users/user.dto';
import { JoinRoomInput } from './joinRoom';

type ServerToClientEvents = {
    'board:ticket-moved': () => void;
    'board:user-joined-room': () => void;
};

type ClientToServerEvents = {
    'board:move-ticket': () => void;
    'board:join-room': (input: JoinRoomInput) => void;
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
