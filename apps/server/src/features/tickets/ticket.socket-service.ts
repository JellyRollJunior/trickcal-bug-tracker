import type { User } from '@prisma/client';
import {
    MoveTicketInput,
    NotFoundError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { assertNullOrInList, computeNewOrder } from '@/lib/ordering/ordering.js';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';
import * as sectionQueries from '@/features/sections/section.queries.js';


const moveTicket = async ({
    userId,
    ticketId,
    sectionId,
    previousTicketId,
    nextTicketId,
}: { userId: User['id'] } & MoveTicketInput) => {
    if (ticketId === previousTicketId || ticketId === nextTicketId) throw new ValidationError({ ticketId: ['ticketId should not match previousTicketId or nextTicketId'] });
    // validate section exists
    const destinationSectionWithTickets = await sectionQueries.getSectionWithTickets({ sectionId });
    if (!destinationSectionWithTickets) throw new NotFoundError('Section not found');
    // validate access to board that destination section resides in
    const boardId = destinationSectionWithTickets.boardId;
    await assertBoardAccess({ userId, boardId });
    // validate ticket in board that destination section resides in
    const ticketWithOriginSection = await ticketQueries.getTicketWithSection({ ticketId });
    if (!ticketWithOriginSection) throw new NotFoundError('Ticket not found');
    if (boardId !== ticketWithOriginSection?.section.boardId) throw new NotFoundError('Ticket and section not in same board');
    // validate prev/next tickets null or in destination section
    assertNullOrInList(previousTicketId, destinationSectionWithTickets.tickets, 'Previous ticket not in section');
    assertNullOrInList(nextTicketId, destinationSectionWithTickets.tickets, 'Next ticket not in section');

    // compute order
    const tickets = await ticketQueries.getTicketsBySection({ sectionId });
    const order = computeNewOrder(tickets, previousTicketId, nextTicketId);

    const ticket = await ticketQueries.moveTicket({
        ticketId,
        sectionId,
        order,
    });
    return ticket;
};

export { moveTicket };
