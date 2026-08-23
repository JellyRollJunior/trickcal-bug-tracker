import { UserDto } from '../features/users/index.js';
import {
    JoinRoomInput,
    MoveTicketInput,
} from './socket.client-to-server.schema.js';
import {
    BoardAddedCollaborator,
    BoardDeletedPayload,
    BoardEditedPayload,
    BoardRemovedCollaborator,
    SectionCreatedPayload,
    SectionDeletedPayload,
    SectionEditedPayload,
    TicketCreatedPayload,
    TicketMovedPayload,
    UserJoinedPayload,
    UserLeftPayload,
} from './socket.server-client.schema.js';
import {
    SocketBaseResponse,
    SocketJoinRoomResponse,
} from './socket.response.js';
import { BoardDto } from '../features/boards/index.js';

type ServerToClientEvents = {
    'board:user-joined-room': (payload: UserJoinedPayload) => void;
    'board:user-left-room': (payload: UserLeftPayload) => void;
    'board:edited': (payload: BoardEditedPayload) => void;
    'board:deleted': (payload: BoardDeletedPayload) => void;
    'board:added-collaborator': (payload: BoardAddedCollaborator) => void;
    'board:removed-collaborator': (payload: BoardRemovedCollaborator) => void;
    'section:created': (payload: SectionCreatedPayload) => void;
    'section:edited': (payload: SectionEditedPayload) => void;
    'section:deleted': (payload: SectionDeletedPayload) => void;
    'ticket:created': (payload: TicketCreatedPayload) => void;
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
    disconnect: () => void;
};

type InterServerEvents = {};

type SocketData = {
    currentBoardId: BoardDto['id'] | null;
    user: UserDto;
};

export {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
};
