import type { Board, Ticket, User } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import * as ticketQueries from '@/features/boards/ticket.queries.js';

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
    const order = generateKeyBetween(tickets.at(-1)?.id ?? null, null);

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

export { createTicket };
