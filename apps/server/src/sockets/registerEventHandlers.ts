import type { AppServer, AppSocket } from '@/sockets/types.js';
import { JoinRoomInput, MoveTicketInput } from '@trickcal-bug-tracker/shared';
import { joinRoom } from '@/sockets/handlers/room.handler.js';
import { moveTicket } from '@/sockets/handlers/ticket.handler.js';
import { withCallbackGuard } from '@/lib/sockets/callbackGuard.js';

const registerEventHandlers = (io: AppServer) => {
    io.on('connection', (socket: AppSocket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on(
            'board:join-room',
            withCallbackGuard((input: JoinRoomInput, callback) =>
                joinRoom(socket, input, callback)
            )
        );

        socket.on(
            'ticket:move',
            withCallbackGuard((input: MoveTicketInput, callback) =>
                moveTicket(socket, input, callback)
            )
        );
    });
};

export { registerEventHandlers };
