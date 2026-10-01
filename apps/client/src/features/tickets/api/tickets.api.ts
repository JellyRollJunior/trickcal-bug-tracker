import {
    deleteTicketResponseSchema,
    patchTicketsRequestBodySchema,
    patchTicketsResponseSchema,
    postTicketsRequestBodySchema,
    postTicketsResponseSchema,
    putAssigneeRequestBodySchema,
    putAssigneeResponseSchema,
    type BoardDto,
    type SectionDto,
    type TicketDto,
} from '@trickcal-bug-tracker/shared';
import z from 'zod';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

type PostTicketRequestBody = z.infer<typeof postTicketsRequestBodySchema>;
const postTickets = async ({
    boardId,
    sectionId,
    data,
}: {
    boardId: BoardDto['id'];
    sectionId: SectionDto['id'];
    data: PostTicketRequestBody;
}) => {
    const path = `/boards/${boardId}/sections/${sectionId}/tickets`;
    const parsedBody = safeParse(postTicketsRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(postTicketsResponseSchema, response);
    return parsedResponse;
};

type PatchTicketRequestBody = z.infer<typeof patchTicketsRequestBodySchema>;
const patchTickets = async ({
    ticketId,
    data,
}: {
    ticketId: TicketDto['id'];
    data: PatchTicketRequestBody;
}) => {
    const path = `/tickets/${ticketId}`;
    const parsedBody = safeParse(patchTicketsRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'PATCH',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(patchTicketsResponseSchema, response);
    return parsedResponse;
};

type PutTicketRequestBody = z.infer<typeof putAssigneeRequestBodySchema>;
const putAssignee = async ({
    ticketId,
    data,
}: {
    ticketId: TicketDto['id'];
    data: PutTicketRequestBody;
}) => {
    const path = `/tickets/${ticketId}/assignee`;
    const parsedBody = safeParse(putAssigneeRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'PUT',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(putAssigneeResponseSchema, response);
    return parsedResponse;
};

const deleteTicket = async ({ ticketId }: { ticketId: TicketDto['id'] }) => {
    const path = `/tickets/${ticketId}`;
    const response = await makeRequest(path, {
        method: 'DELETE',
    });
    const parsedResponse = safeParse(deleteTicketResponseSchema, response);
    return parsedResponse;
};

export { postTickets, patchTickets, putAssignee, deleteTicket };
