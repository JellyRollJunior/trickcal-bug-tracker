import { z } from 'zod';
import { sectionShape } from '../features/sections';
import { userDtoSchema } from '../features/users';
import { ticketDtoSchema } from '../features/tickets';

// board:user-joined-room
const userJoinedRoomPayloadSchema = z.object({
    user: userDtoSchema,
});
type UserJoinedPayload = z.infer<typeof userJoinedRoomPayloadSchema>;

// ticket:moved
const ticketMovedPayloadSchema = z.object({
    movedBy: userDtoSchema,
    previousSectionId: sectionShape.id,
    ticket: ticketDtoSchema,
});
type TicketMovedPayload = z.infer<typeof ticketMovedPayloadSchema>;

export type { UserJoinedPayload, TicketMovedPayload };
export { userJoinedRoomPayloadSchema, ticketMovedPayloadSchema };
