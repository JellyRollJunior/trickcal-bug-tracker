import type { Board, Ticket, User } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { NotFoundError } from '@trickcal-bug-tracker/shared';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';

const createTicket = async ({
    userId,
    boardId,
    sectionId,
    issueType,
    category,
    reproducibility,
    summary,
    description,
    priority,
    severity,
    assigneeId,
}: { userId: User['id']; boardId: Board['id'] } & Pick<
    Ticket,
    | 'sectionId'
    | 'issueType'
    | 'category'
    | 'reproducibility'
    | 'summary'
    | 'description'
> & {
        priority: Ticket['priority'];
        severity: Ticket['severity'];
        assigneeId: Ticket['assignedTo'] | null;
    }) => {
    await assertBoardAccess({ userId, boardId });

    // compute order
    const tickets = await ticketQueries.getTicketsBySection({ sectionId });
    const order = generateKeyBetween(tickets.at(-1)?.order ?? null, null);

    // create ticket
    const newTicket = await ticketQueries.createTicket({
        sectionId,
        order,
        issueType,
        category,
        reproducibility,
        summary,
        description,
        reporterId: userId,
        priority,
        severity,
        assigneeId,
    });
    return newTicket;
};

const deleteTicket = async ({
    userId,
    ticketId,
}: {
    userId: User['id'];
    ticketId: Ticket['id'];
}) => {
    const ticket = await ticketQueries.getTicketWithSection({ ticketId: ticketId });
    if (!ticket) throw new NotFoundError('Ticket not found');
    await assertBoardAccess({ userId, boardId: ticket?.section.boardId ?? '' });

    const deletedTicket = await ticketQueries.deleteTicket({ ticketId });
    return deletedTicket;
};

export { createTicket, deleteTicket };
