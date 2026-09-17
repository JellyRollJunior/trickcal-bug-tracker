import {
    postSectionsRequestBodySchema,
    postSectionsResponseSchema,
    type BoardDto,
    type SectionDto,
} from '@trickcal-bug-tracker/shared';
import { makeRequest } from '@/lib/apiClient.ts';

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
    const body = { name, previousSectionId };
    const parsedBody = postSectionsRequestBodySchema.parse(body);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = postSectionsResponseSchema.parse(response);
    return parsedResponse;
};

export { postSections };
