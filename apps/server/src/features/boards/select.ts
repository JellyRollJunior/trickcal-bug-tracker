import { Prisma } from '@prisma/client';
import { userSummarySelect } from '@/features/users/select.js';

const ticketInclude = Prisma.validator<Prisma.TicketInclude>()({
    reporter: { select: userSummarySelect },
    assignee: { select: userSummarySelect },
});

const sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
    tickets: { include: ticketInclude, orderBy: { order: 'asc' } },
});

const boardInclude = Prisma.validator<Prisma.BoardInclude>()({
    owner: { select: userSummarySelect },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
});

const boardWithSectionsAndTicketsInclude = Prisma.validator<Prisma.BoardInclude>()({
    owner: { select: userSummarySelect },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
    sections: { include: sectionInclude, orderBy: { order: 'asc' } },
});


type TicketWithParticipants = Prisma.TicketGetPayload<{
    include: typeof ticketInclude;
}>;

type SectionWithTickets = Prisma.SectionGetPayload<{
    include: typeof sectionInclude;
}>

type BoardWithParticipants = Prisma.BoardGetPayload<{
    include: typeof boardInclude;
}>;

type BoardWithSectionsAndTickets = Prisma.BoardGetPayload<{
    include: typeof boardWithSectionsAndTicketsInclude;
}>;

export { ticketInclude, sectionInclude, boardInclude, boardWithSectionsAndTicketsInclude };
export type { TicketWithParticipants, SectionWithTickets, BoardWithParticipants, BoardWithSectionsAndTickets };
