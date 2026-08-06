import { z } from 'zod';
import { sectionDtoSchema, sectionShape } from '../features/sections';
import { userDtoSchema, userShape } from '../features/users';
import { ticketDtoSchema } from '../features/tickets';
import { boardDtoSchema, boardShape } from '../features/boards';

/* ---------- BOARDS ---------- */
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

// board:edited
const boardEditedPayloadSchema = z.object({
    board: boardDtoSchema,
});
type BoardEditedPayload = z.infer<typeof boardEditedPayloadSchema>;

/* ---------- Sections ---------- */
// section:created
const sectionCreatedPayloadSchema = z.object({
    boardId: boardShape.id,
    section: sectionDtoSchema,
});
type SectionCreatedPayload = z.infer<typeof sectionCreatedPayloadSchema>;

/* ---------- Tickets ---------- */
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
    BoardEditedPayload,
    SectionCreatedPayload,
    TicketCreatedPayload,
    TicketMovedPayload,
    UserJoinedPayload,
    UserLeftPayload,
};
export {
    boardEditedPayloadSchema,
    sectionCreatedPayloadSchema,
    ticketCreatedPayloadSchema,
    ticketMovedPayloadSchema,
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
};
