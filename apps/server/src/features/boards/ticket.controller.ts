import type { Board, Section, Ticket } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { createTicket } from '@/features/boards/ticket.service.js';
import { toTicketDto } from '@/features/boards/ticket.mapper.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';

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

        // create ticket
        const newTicket = await createTicket({
            userId,
            boardId,
            sectionId,
            ...req.body,
        });
        res.json(toTicketDto(newTicket));
    } catch (error) {
        next(error);
    }
};

export { postTicket };
