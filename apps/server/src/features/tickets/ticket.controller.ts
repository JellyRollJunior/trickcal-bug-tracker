import type { Board, Section, Ticket } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { boardIdAndSectionIdParamSchema, ticketIdParamSchema } from '@trickcal-bug-tracker/shared';
import { toTicketDto } from '@/features/tickets/ticket.mapper.js';
import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { getIo } from '@/sockets/ioInstance.js';
import * as ticketServices from '@/features/tickets/ticket.service.js';

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
        const { boardId, sectionId } = boardIdAndSectionIdParamSchema.parse(
            req.params
        );

        const newTicket = await ticketServices.createTicket({
            userId,
            boardId,
            sectionId,
            ...req.body,
        });

        // emit ticket creation
        const ticketDto = toTicketDto(newTicket);
        const io = getIo();
        io.sockets
            .to(boardId)
            .emit('ticket:created', { boardId, ticket: ticketDto });

        res.json(ticketDto);
    } catch (error) {
        next(error);
    }
};

const deleteTickets = async (
    req: Request<{ ticketId: Ticket['id'] }, {}, { boardId: Board['id']; }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new AuthenticationError();
        const { ticketId } = ticketIdParamSchema.parse(req.params);
        const { boardId } = req.body;

        const deletedTicket = await ticketServices.deleteTicket({ userId, boardId, ticketId });

        // emit event
        const ticketDto = toTicketDto(deletedTicket);

        res.json(ticketDto)
    } catch (error) {
        next(error);
    }
};

export { postTickets, deleteTickets };
