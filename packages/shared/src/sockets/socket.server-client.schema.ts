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

// ticket:moved
const ticketMovedPayloadSchema = z.object({
    movedBy: userDtoSchema,
    previousSectionId: sectionShape.id,
    ticket: ticketDtoSchema,
});
type TicketMovedPayload = z.infer<typeof ticketMovedPayloadSchema>;

export type { UserJoinedPayload, UserLeftPayload, TicketMovedPayload };
export {
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
    ticketMovedPayloadSchema,
};
