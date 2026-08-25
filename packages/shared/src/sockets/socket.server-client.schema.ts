import { z } from 'zod';
import { sectionDtoSchema, sectionShape } from '../features/sections/index.js';
import { userDtoSchema, userShape } from '../features/users/index.js';
import { ticketDtoSchema } from '../features/tickets/index.js';
import { boardDtoSchema, boardShape } from '../features/boards/index.js';

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

// board:deleted
const boardDeletedPayloadSchema = z.object({
    board: boardDtoSchema,
});
type BoardDeletedPayload = z.infer<typeof boardDeletedPayloadSchema>;

// board:added-collaborator
const boardAddedCollaboratorPayloadSchema = z.object({
    user: userDtoSchema,
    board: boardDtoSchema,
});
type BoardAddedCollaborator = z.infer<typeof boardAddedCollaboratorPayloadSchema>;

// board:removed-collaborator
type BoardRemovedCollaborator = z.infer<typeof boardAddedCollaboratorPayloadSchema>;


/* ---------- Sections ---------- */
// section:created
const sectionCreatedPayloadSchema = z.object({
    boardId: boardShape.id,
    section: sectionDtoSchema,
});
type SectionCreatedPayload = z.infer<typeof sectionCreatedPayloadSchema>;

// section:edited
type SectionEditedPayload = z.infer<typeof sectionCreatedPayloadSchema>;

// section:deleted
type SectionDeletedPayload = z.infer<typeof sectionCreatedPayloadSchema>;


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

// ticket:updated
const ticketUpdatedPayloadSchema = z.object({
    updatedBy: userDtoSchema,
    ticket: ticketDtoSchema,
})
type TicketUpdatedPayload = z.infer<typeof ticketUpdatedPayloadSchema>;

// ticket:deleted
const ticketDeletedPayloadSchema = z.object({
    deletedby: userDtoSchema,
    ticket: ticketDtoSchema,
})
type TicketDeletedPayload = z.infer<typeof ticketDeletedPayloadSchema>;

export type {
    BoardAddedCollaborator,
    BoardRemovedCollaborator,
    BoardDeletedPayload,
    BoardEditedPayload,
    
    SectionCreatedPayload,
    SectionDeletedPayload,
    SectionEditedPayload,
    
    TicketCreatedPayload,
    TicketUpdatedPayload,
    TicketMovedPayload,
    TicketDeletedPayload,
    
    UserJoinedPayload,
    UserLeftPayload,
};
export {
    boardAddedCollaboratorPayloadSchema,
    boardDeletedPayloadSchema,
    boardEditedPayloadSchema,
    
    sectionCreatedPayloadSchema,
    
    ticketCreatedPayloadSchema,
    ticketMovedPayloadSchema,
    ticketUpdatedPayloadSchema,
    ticketDeletedPayloadSchema,
    
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
};
