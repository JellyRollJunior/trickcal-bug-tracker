import { Prisma } from '@prisma/client';
import { userSummarySelect } from '@/features/users/select.js';

const ticketInclude = Prisma.validator<Prisma.TicketInclude>()({
    assignee: { select: userSummarySelect },
    reporter: { select: userSummarySelect },
});

const sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
    tickets: { include: ticketInclude, orderBy: { order: 'asc' } },
});

const boardInclude = Prisma.validator<Prisma.BoardInclude>()({
    sections: { include: sectionInclude, orderBy: { order: 'asc' } },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
});

export { ticketInclude, sectionInclude, boardInclude };
