import { Category, IssueType, Priority, Severity } from '@prisma/client';
import { z } from 'zod';

const postTicketsRequestBodySchema = z.object({
    issueType: z.enum(IssueType),
    category: z.enum(Category),
    reproducibility: z.boolean(),
    summary: z.string(),
    description: z.string(),
    priority: z.enum(Priority),
    severity: z.enum(Severity),
    assigneeId: z.uuid().nullable(),
});

export { postTicketsRequestBodySchema };
