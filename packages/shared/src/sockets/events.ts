import { BoardDto } from '../boards/board.dto';
import { UserDto } from '../users/user.dto';

type ServerToClientEvents = {
    'board:ticketMoved': () => void;
    'board:userJoinedRoom': () => void;
};

type ClientToServerEvents = {
    'board:moveTicket': () => void;
    'board:joinRoom': (boardId: BoardDto['id']) => void;
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
