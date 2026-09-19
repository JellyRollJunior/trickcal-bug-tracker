import {
    postTicketsRequestBodySchema,
    type BoardDto,
    type SectionDto,
} from '@trickcal-bug-tracker/shared';
import z from 'zod';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

type PostTicketRequestBody = z.infer<typeof postTicketsRequestBodySchema>;

const postTicket = async ({
    boardId,
    sectionId,
    data,
}: {
    boardId: BoardDto['id'];
    sectionId: SectionDto['id'];
    data: PostTicketRequestBody;
}) => {
    const path = `/boards/${boardId}/sections/${sectionId}/tickets`;
    const parsedPayload = safeParse(postTicketsRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedPayload),
    });
    return response;
};

export { postTicket };
