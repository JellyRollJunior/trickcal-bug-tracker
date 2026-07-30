import { Prisma } from '@prisma/client';
import { userSummarySelect } from '@/features/users/user.select.js';

const ticketInclude = Prisma.validator<Prisma.TicketInclude>()({
    reporter: { select: userSummarySelect },
    assignee: { select: userSummarySelect },
});

type TicketWithParticipants = Prisma.TicketGetPayload<{
    include: typeof ticketInclude;
}>;

export { ticketInclude };
export type { TicketWithParticipants };
