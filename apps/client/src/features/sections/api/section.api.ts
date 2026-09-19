import {
    postSectionsRequestBodySchema,
    postSectionsResponseSchema,
    type BoardDto,
} from '@trickcal-bug-tracker/shared';
import z from 'zod';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

type PostSectionRequestBody = z.infer<typeof postSectionsRequestBodySchema>;

const postSections = async ({
    boardId,
    data,
}: {
    boardId: BoardDto['id'];
    data: PostSectionRequestBody;
}) => {
    const path = `/boards/${boardId}/sections`;
    const parsedBody = safeParse(postSectionsRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(postSectionsResponseSchema, response);
    return parsedResponse;
};

export { postSections };
