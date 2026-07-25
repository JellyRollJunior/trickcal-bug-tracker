import type { Board, Section, Ticket } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { toTicketDto } from '@/features/boards/ticket.mapper.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import * as ticketQueries from '@/features/boards/ticket.queries.js';

const postTicket = async (
    req: Request<
        { boardId: Board['id']; sectionId: Section['id'] },
        {},
        Pick<
            Ticket,
            | 'issueType'
            | 'category'
            | 'reproducibility'
            | 'summary'
            | 'description'
        > & {
            priority: Ticket['priority'];
            severity: Ticket['severity'];
            assigneeId: Ticket['assignedTo'] | null;
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId, sectionId } = { ...req.params };
        await assertBoardAccess({ userId, boardId });

        // compute order
        const tickets = await ticketQueries.getTicketsBySection({ sectionId });
        const order = generateKeyBetween(tickets.at(-1)?.id ?? null, null);

        // create ticket
        const newTicket = await ticketQueries.createTicket({
            sectionId,
            order,
            reporterId: userId,
            ...req.body,
        });
        res.json(toTicketDto(newTicket));
    } catch (error) {
        next(error);
    }
};

export { postTicket };
