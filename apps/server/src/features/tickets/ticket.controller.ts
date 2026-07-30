import type { Board, Section, Ticket } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { boardIdAndSectionIdParamSchema } from '@/features/boards/board.request.schema.js';
import { createTicket } from '@/features/tickets/ticket.service.js';
import { toTicketDto } from '@/features/tickets/ticket.mapper.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';

const postTickets = async (
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
            | 'priority'
            | 'severity'
        > & {
            assigneeId: Ticket['assignedTo'];
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { boardId, sectionId } = boardIdAndSectionIdParamSchema.parse(req.params);

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

export { postTickets };
