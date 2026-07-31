import type { AppSocket } from '../types.js';
import z, { ZodError } from 'zod';
import {
    BaseError,
    DatabaseError,
    MoveTicketInput,
    moveTicketInputSchema,
    SocketBaseResponse,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';

const moveTicket = async (
    socket: AppSocket,
    input: MoveTicketInput,
    callback: (response: SocketBaseResponse) => void
) => {
    // validate callback
    if (typeof callback !== 'function') {
        console.warn(
            `Socket ${socket.id} called board:join-room without a callback`
        );
        return;
    }
    try {
        // validate input
        const parsed = moveTicketInputSchema.parse(input);
        const { ticketId, sectionId, order } = { ...parsed };

        // validate user has permission for board: TODO

        const ticket = await ticketQueries.moveTicket({
            ticketId,
            sectionId,
            order,
        });
        if (ticket) {
            callback({ success: true });
        } else {
            callback({
                success: false,
                error: new DatabaseError('Unable to move ticket'),
            });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const validationError = new ValidationError(
                z.flattenError(error).fieldErrors
            );
            callback({ success: false, error: validationError });
        } else {
            callback({ success: false, error: new BaseError() });
        }
    }
};

export { moveTicket };
