import { Prisma } from '@prisma/client';
import { ticketInclude } from '@/features/tickets/ticket.select.js';

const sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
    tickets: { include: ticketInclude, orderBy: { order: 'asc' } },
});

type SectionWithTickets = Prisma.SectionGetPayload<{
    include: typeof sectionInclude;
}>;

export { sectionInclude };
export type { SectionWithTickets };
