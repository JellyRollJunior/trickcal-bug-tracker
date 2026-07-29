import { UserDto } from '../users/user.dto';

type ServerToClientEvents = {
    'board:itemMoved': () => void;
    'board:userJoinedRoom': () => void;
};

type ClientToServerEvents = {
    'board:moveItem': () => void;
    'board:joinRoom': () => void;
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
