import type { AppSocket } from '../types.js';
import {
    DatabaseError,
    MoveTicketInput,
    moveTicketInputSchema,
    SocketBaseResponse,
} from '@trickcal-bug-tracker/shared';
import { socketErrorHandler } from '@/sockets/handlers/error.handler.js';
import * as ticketService from '@/features/tickets/ticket.socket-service.js';

const moveTicket = async (
    socket: AppSocket,
    input: MoveTicketInput,
    callback: (response: SocketBaseResponse) => void
) => {
    try {
        // validate input
        const userId = socket.data.user.id;
        const parsed = moveTicketInputSchema.parse(input);
        const { ticketId, sectionId, previousTicketId, nextTicketId } = {
            ...parsed,
        };

        const movedTicket = await ticketService.moveTicket({
            userId,
            ticketId,
            sectionId,
            previousTicketId,
            nextTicketId,
        });
        if (movedTicket) {
            callback({ success: true });
        } else {
            callback({
                success: false,
                error: new DatabaseError('Unable to move ticket'),
            });
        }
    } catch (error) {
        socketErrorHandler(error, callback)
    }
};

export { moveTicket };
