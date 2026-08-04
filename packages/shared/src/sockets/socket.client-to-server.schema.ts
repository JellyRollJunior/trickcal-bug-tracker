import { z } from 'zod';
import { boardShape } from '../features/boards/board.schema.js';
import { ticketShape } from '../features/tickets/ticket.schema.js';

// board:join-room
const joinRoomInputSchema = z.object({
    boardId: boardShape.id,
});
type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;

// ticket:move
const moveTicketInputSchema = z.object({
    ticketId: ticketShape.id,
    sectionId: ticketShape.sectionId,
    previousTicketId: ticketShape.id.nullable(),
});
type MoveTicketInput = z.infer<typeof moveTicketInputSchema>;

export type { JoinRoomInput, MoveTicketInput };
export { joinRoomInputSchema, moveTicketInputSchema };
