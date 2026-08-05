import { z } from 'zod';
import { sectionShape } from '../features/sections';
import { userDtoSchema, userShape } from '../features/users';
import { ticketDtoSchema } from '../features/tickets';

// board:user-joined-room
const userJoinedRoomPayloadSchema = z.object({
    user: userDtoSchema,
});
type UserJoinedPayload = z.infer<typeof userJoinedRoomPayloadSchema>;

const userLeftRoomPayloadSchema = z.object({
    userId: userShape.id,
});
type UserLeftPayload = z.infer<typeof userLeftRoomPayloadSchema>;

// ticket:created
const ticketCreatedPayloadSchema = z.object({
    ticket: ticketDtoSchema,
});
type TicketCreatedPayload = z.infer<typeof ticketCreatedPayloadSchema>;

// ticket:moved
const ticketMovedPayloadSchema = z.object({
    movedBy: userDtoSchema,
    previousSectionId: sectionShape.id,
    ticket: ticketDtoSchema,
});
type TicketMovedPayload = z.infer<typeof ticketMovedPayloadSchema>;

export type { UserJoinedPayload, UserLeftPayload, TicketCreatedPayload, TicketMovedPayload };
export {
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
    ticketCreatedPayloadSchema,
    ticketMovedPayloadSchema,
};
