import {
    postSectionsRequestBodySchema,
    postSectionsResponseSchema,
    type BoardDto,
    type SectionDto,
} from '@trickcal-bug-tracker/shared';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

const postSections = async ({
    boardId,
    name,
    previousSectionId,
}: {
    boardId: BoardDto['id'];
    name: SectionDto['name'];
    previousSectionId: SectionDto['id'];
}) => {
    const path = `/boards/${boardId}/sections`;
    const payload = { name, previousSectionId };
    const parsedBody = safeParse(postSectionsRequestBodySchema, payload);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(postSectionsResponseSchema, response);
    return parsedResponse;
};

export { postSections };
