import z from 'zod';
import {
    deleteSectionResponseSchema,
    postSectionsRequestBodySchema,
    postSectionsResponseSchema,
    type BoardDto,
    type SectionDto,
} from '@trickcal-bug-tracker/shared';
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

const deleteSection = async ({
    sectionId,
}: {
    sectionId: SectionDto['id'];
}) => {
    const path = `/sections/${sectionId}`;
    const response = await makeRequest(path, {
        method: 'DELETE',
    });
    const parsedResponse = safeParse(deleteSectionResponseSchema, response);
    return parsedResponse;
};

export { postSections, deleteSection };
