import {
    deleteSectionResponseSchema,
    patchSectionsRequestBodySchema,
    patchSectionsResponseSchema,
    postSectionsRequestBodySchema,
    postSectionsResponseSchema,
    type BoardDto,
    type PatchSectionsRequestBody,
    type PostSectionsRequestBody,
    type SectionDto,
} from '@trickcal-bug-tracker/shared';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

const postSections = async ({
    boardId,
    data,
}: {
    boardId: BoardDto['id'];
    data: PostSectionsRequestBody;
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

const patchSections = async ({
    sectionId,
    data,
}: {
    sectionId: SectionDto['id'];
    data: PatchSectionsRequestBody;
}) => {
    const path = `/sections/${sectionId}`;
    const parsedBody = safeParse(patchSectionsRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'PATCH',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(patchSectionsResponseSchema, response);
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

export { postSections, patchSections, deleteSection };
