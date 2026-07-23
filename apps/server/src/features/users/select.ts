import { Prisma } from '@prisma/client';

const userSummarySelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
});

type UserSummary = Prisma.UserGetPayload<{ select: typeof userSummarySelect }>;

export type { UserSummary };
export { userSummarySelect };
