import { UserDto } from '../users/user.dto';

type ServerToClientEvents = {
    'board:ticketMoved': () => void;
    'board:userJoinedRoom': () => void;
};

type ClientToServerEvents = {
    'board:moveTicket': () => void;
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
