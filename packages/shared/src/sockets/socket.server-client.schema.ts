import { z } from 'zod';
import { sectionDtoSchema, sectionShape } from '../features/sections';
import { userDtoSchema, userShape } from '../features/users';
import { ticketDtoSchema } from '../features/tickets';
import { boardShape } from '../features/boards';

// board:user-joined-room
const userJoinedRoomPayloadSchema = z.object({
    user: userDtoSchema,
});
type UserJoinedPayload = z.infer<typeof userJoinedRoomPayloadSchema>;

// board:user-left-room
const userLeftRoomPayloadSchema = z.object({
    userId: userShape.id,
});
type UserLeftPayload = z.infer<typeof userLeftRoomPayloadSchema>;

// section:created
const sectionCreatedPayloadSchema = z.object({
    boardId: boardShape.id,
    section: sectionDtoSchema,
});
type SectionCreatedPayload = z.infer<typeof sectionCreatedPayloadSchema>;

// ticket:created
const ticketCreatedPayloadSchema = z.object({
    boardId: boardShape.id,
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

export type {
    UserJoinedPayload,
    UserLeftPayload,
    SectionCreatedPayload,
    TicketCreatedPayload,
    TicketMovedPayload,
};
export {
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
    sectionCreatedPayloadSchema,
    ticketCreatedPayloadSchema,
    ticketMovedPayloadSchema,
};
