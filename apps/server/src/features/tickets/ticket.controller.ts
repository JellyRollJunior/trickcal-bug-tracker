import type { Board, Prisma, Section, Ticket, User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
    boardIdAndSectionIdParamSchema,
    ticketIdParamSchema,
    AuthenticationError,
} from '@trickcal-bug-tracker/shared';
import { getIo } from '@/sockets/ioInstance.js';
import { toTicketDto } from '@/features/tickets/ticket.mapper.js';
import { toUserDto } from '@/features/users/user.mapper.js';
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

const patchTickets = async (
    req: Request<
        { ticketId: Ticket['id'] },
        {},
        Pick<
            Prisma.TicketUpdateInput,
            | 'issueType'
            | 'category'
            | 'priority'
            | 'severity'
            | 'reproducibility'
            | 'summary'
            | 'description'
        >
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const userId = req.user.id;
        const { ticketId } = ticketIdParamSchema.parse(req.params);
        const updates = req.body;

        const { boardId, ticket } = await ticketServices.updateTicket({
            userId,
            ticketId,
            updates,
        });

        const ticketDto = toTicketDto(ticket);
        const io = getIo();
        io.to(boardId).emit('ticket:updated', {
            updatedBy: toUserDto(req.user),
            ticket: ticketDto,
        });

        res.json(ticketDto);
    } catch (error) {
        next(error);
    }
};

const putTicketAssignee = async (
    req: Request<{ ticketId: Ticket['id'] }, {}, { assigneeId: User['id'] }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const userId = req.user.id;
        const { ticketId } = ticketIdParamSchema.parse(req.params);
        const { assigneeId } = req.body;

        const { boardId, updatedTicket } = await ticketServices.updateAssignee({ userId, ticketId, assigneeId });

        const ticketDto = toTicketDto(updatedTicket);
        const io = getIo();
        io.to(boardId).emit('ticket:updated-assignee', { updatedBy: toUserDto(req.user), ticket: ticketDto });
        
        res.json(ticketDto)
    } catch (error) {
        next(error);
    }
};

const deleteTickets = async (
    req: Request<{ ticketId: Ticket['id'] }, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) throw new AuthenticationError();
        const userId = req.user.id;
        const { ticketId } = ticketIdParamSchema.parse(req.params);

        const { boardId, deletedTicket } = await ticketServices.deleteTicket({
            userId,
            ticketId,
        });

        // emit event
        const ticketDto = toTicketDto(deletedTicket);
        const io = getIo();
        io.to(boardId).emit('ticket:deleted', {
            deletedby: toUserDto(req.user),
            ticket: ticketDto,
        });

        res.json(ticketDto);
    } catch (error) {
        next(error);
    }
};

export { postTickets, patchTickets, putTicketAssignee, deleteTickets };
