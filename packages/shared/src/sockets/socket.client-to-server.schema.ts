import { z } from 'zod';
import { boardSchema } from '../features/boards/board.schema.js';
import { ticketSchema } from '../features/tickets/ticket.schema.js';

// board:join-room
const joinRoomInputSchema = z.object({
    boardId: boardSchema.id,
});
type JoinRoomInput = z.infer<typeof joinRoomInputSchema>;

// ticket:move
const moveTicketInputSchema = z.object({
    ticketId: ticketSchema.id,
    sectionId: ticketSchema.sectionId,
    previousTicketId: ticketSchema.id.nullable(),
});
type MoveTicketInput = z.infer<typeof moveTicketInputSchema>;

export type { JoinRoomInput, MoveTicketInput };
export { joinRoomInputSchema, moveTicketInputSchema };
