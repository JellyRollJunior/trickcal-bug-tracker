import { UserDto } from '../users/user.dto';
import { JoinRoomInput } from './joinRoom';

type ServerToClientEvents = {
    'board:ticketMoved': () => void;
    'board:userJoinedRoom': () => void;
};

type ClientToServerEvents = {
    'board:moveTicket': () => void;
    'board:joinRoom': (input: JoinRoomInput) => void;
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
