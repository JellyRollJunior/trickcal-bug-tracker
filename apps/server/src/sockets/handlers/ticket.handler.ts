import type { AppSocket } from '@/sockets/types.js';
import {
    MoveTicketInput,
    moveTicketInputSchema,
    SocketBaseResponse,
} from '@trickcal-bug-tracker/shared';
import { toUserDto } from '@/features/users/user.mapper.js';
import { socketErrorHandler } from '@/sockets/handlers/socket.error-handler.js';
import * as ticketService from '@/features/tickets/ticket.socket-service.js';
import { toTicketDto } from '@/features/tickets/ticket.mapper.js';

const moveTicket = async (
    socket: AppSocket,
    input: MoveTicketInput,
    callback: (response: SocketBaseResponse) => void
) => {
    try {
        // validate input
        const userId = socket.data.user.id;
        const parsed = moveTicketInputSchema.parse(input);
        const { ticketId, sectionId, previousTicketId } = parsed;

        const result = await ticketService.moveTicket({
            userId,
            ticketId,
            sectionId,
            previousTicketId,
        });
        callback({ success: true });
        socket.to(result.boardId).emit('ticket:moved', {
            movedBy: toUserDto(socket.data.user),
            previousSectionId: result.previousSectionId,
            ticket: toTicketDto(result.ticket),
        });
    } catch (error) {
        socketErrorHandler(error, callback);
    }
};

export { moveTicket };
