import type { Board, Section, Ticket } from '@prisma/client';
import { AuthenticationError, NotFoundError } from '@trickcal-bug-tracker/shared';
import { Request, Response, NextFunction } from 'express';
import * as boardQueries from '@/features/boards/board.queries.js';

const postTicket = async (
    req: Request<
        { boardId: Board['id']; sectionId: Section['id'] },
        {},
        Pick<
            Ticket,
            | 'issueType'
            | 'category'
            | 'severity'
            | 'reproducibility'
            | 'summary'
            | 'description'
            | 'reporterId'
        > & {
            priority: Ticket['priority'] | null;
            severity: Ticket['severity'] | null;
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

        // verify permission to board
        const board = await boardQueries.getBoardById({ userId, boardId });
        if (!board) throw new NotFoundError('Unable to create board');

        // calculate order (place in last place of section)


        // create ticket
    } catch (error) {
        next(error);
    }
};

export { postTicket };
