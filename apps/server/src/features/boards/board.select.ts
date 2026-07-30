import { Prisma } from '@prisma/client';
import { userSummarySelect } from '@/features/users/user.select.js';
import { sectionInclude } from '@/features/boards/section.select.js';

const boardInclude = Prisma.validator<Prisma.BoardInclude>()({
    owner: { select: userSummarySelect },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
});

const boardWithSectionsInclude = Prisma.validator<Prisma.BoardInclude>()({
    owner: { select: userSummarySelect },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
    sections: { orderBy: { order: 'asc' } },
});

const boardWithSectionsAndTicketsInclude =
    Prisma.validator<Prisma.BoardInclude>()({
        owner: { select: userSummarySelect },
        collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
        sections: { include: sectionInclude, orderBy: { order: 'asc' } },
    });

type BoardWithParticipants = Prisma.BoardGetPayload<{
    include: typeof boardInclude;
}>;

type BoardWithSections = Prisma.BoardGetPayload<{
    include: typeof boardWithSectionsInclude;
}>;

type BoardWithSectionsAndTickets = Prisma.BoardGetPayload<{
    include: typeof boardWithSectionsAndTicketsInclude;
}>;

export {
    sectionInclude,
    boardInclude,
    boardWithSectionsInclude,
    boardWithSectionsAndTicketsInclude,
};
export type {
    BoardWithParticipants,
    BoardWithSections,
    BoardWithSectionsAndTickets,
};
