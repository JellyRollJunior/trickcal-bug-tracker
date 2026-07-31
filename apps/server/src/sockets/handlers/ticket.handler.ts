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
import * as ticketService from '@/features/tickets/ticket.socket-service.js';

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
