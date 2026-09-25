import {
    getAvailableNewCollaboratorsResponseSchema,
    getBoardResponseSchema,
    getBoardsResponseSchema,
    patchBoardResponseSchema,
    patchboardsRequestBodySchema,
    postBoardCollaboratorRequestBodySchema,
    postBoardCollaboratorResponseSchema,
    ValidationError,
    type BoardDto,
    type PatchboardsRequestBody,
    type UserDto,
} from '@trickcal-bug-tracker/shared';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

const getBoards = async () => {
    const path = '/boards';
    const response = await makeRequest(path, { method: 'GET' });
    const parsedResponse = safeParse(getBoardsResponseSchema, response);
    return parsedResponse;
};

const getBoard = async (boardId: BoardDto['id']) => {
    const path = `/boards/${boardId}`;
    const response = await makeRequest(path, { method: 'GET' });
    const parsedResponse = safeParse(getBoardResponseSchema, response);
    return parsedResponse;
};

const patchBoard = async ({
    boardId,
    data,
}: {
    boardId: BoardDto['id'];
    data: PatchboardsRequestBody;
}) => {
    const path = `/boards/${boardId}`;
    const parsedBody = safeParse(patchboardsRequestBodySchema, data);
    if (Object.keys(parsedBody).length <= 0) {
        throw new ValidationError({
            'At least one value required': [
                'name is undefined',
                'description is undefined',
            ],
        });
    }
    const response = await makeRequest(path, {
        method: 'PATCH',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(patchBoardResponseSchema, response);
    return parsedResponse;
};

const getAvailableNewCollaborators = async ({
    boardId,
}: {
    boardId: BoardDto['id'];
}) => {
    const path = `/boards/${boardId}/collaborators/available`;
    const response = await makeRequest(path, {
        method: 'GET',
    });
    const parsedResponse = safeParse(
        getAvailableNewCollaboratorsResponseSchema,
        response
    );
    return parsedResponse;
};

const postNewCollaborator = async ({
    boardId,
    data,
}: {
    boardId: BoardDto['id'];
    data: { collaboratorId: UserDto['id'] };
}) => {
    const path = `/boards/${boardId}/collaborators`;
    const parsedBody = safeParse(postBoardCollaboratorRequestBodySchema, data);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedBody),
    });
    const parsedResponse = safeParse(
        postBoardCollaboratorResponseSchema,
        response
    );
    return parsedResponse;
};

export {
    getBoards,
    getBoard,
    patchBoard,
    getAvailableNewCollaborators,
    postNewCollaborator,
};
