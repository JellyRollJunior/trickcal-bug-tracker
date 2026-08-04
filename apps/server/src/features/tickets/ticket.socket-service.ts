import type { Board, Section, User } from '@prisma/client';
import {
    MoveTicketInput,
    NotFoundError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import {
    assertNullOrInList,
    getNextIndexInList,
    assertValidOrdering,
} from '@/lib/ordering/ordering.js';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { generateKeyBetween } from 'fractional-indexing';
import { TicketWithParticipants } from '@/features/tickets/ticket.select.js';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';
import * as sectionQueries from '@/features/sections/section.queries.js';

const moveTicket = async ({
    userId,
    ticketId,
    sectionId,
    previousTicketId,
}: { userId: User['id'] } & MoveTicketInput): Promise<MoveTicketResult> => {
    if (ticketId === previousTicketId) throw new ValidationError({ ticketId: ['ticketId should not match previousTicketId'] });
    
    // validate section exists
    const destinationSectionWithTickets = await sectionQueries.getSectionWithTickets({ sectionId });
    if (!destinationSectionWithTickets) throw new NotFoundError('Section not found');
    // remove move ticket from list (for retrieving next ticket)
    const tickets = destinationSectionWithTickets.tickets.filter((ticket) => ticket.id !== ticketId);
    
    // validate access to board that destination section resides in
    const boardId = destinationSectionWithTickets.boardId;
    await assertBoardAccess({ userId, boardId });
    
    // validate ticket exists & ticket in board that destination section resides in
    const ticketWithOriginSection = await ticketQueries.getTicketWithSection({ ticketId });
    if (!ticketWithOriginSection) throw new NotFoundError('Ticket not found');
    if (boardId !== ticketWithOriginSection?.section.boardId) throw new NotFoundError('Ticket and section not in same board');
    
    // validate prev ticket null or exists and in destination section
    assertNullOrInList(previousTicketId, tickets, 'Previous ticket not in section');
    const previousTicket = previousTicketId !== null ? tickets.find((ticket) => ticket.id === previousTicketId) : null;
    
    // assert valid ordering
    const nextTicketIndex = getNextIndexInList(previousTicketId, tickets)
    let nextTicket = nextTicketIndex !== null ? tickets[nextTicketIndex] : null;
    if (ticketId === nextTicket?.id) throw new ValidationError({ ticketId: ['Invalid ticket ordering'] });
    assertValidOrdering(tickets, previousTicket ?? null, nextTicket);

    // move ticket
    const order = generateKeyBetween(previousTicket?.order, nextTicket?.order);
    const ticket = await ticketQueries.moveTicket({
        ticketId,
        sectionId,
        order,
    });
    return { boardId, previousSectionId: ticketWithOriginSection.sectionId, ticket };
};
type MoveTicketResult = {
    boardId: Board['id'];
    previousSectionId: Section['id'];
    ticket: TicketWithParticipants;
};

export type { MoveTicketResult }
export { moveTicket };
