import {
    getBoardResponseSchema,
    getBoardsResponseSchema,
    type BoardDto,
} from '@trickcal-bug-tracker/shared';
import { makeRequest } from '@/lib/apiClient.ts';

const getBoards = async () => {
    const path = '/boards';
    const response = await makeRequest(path, { method: 'GET' });
    const parsedResponse = getBoardsResponseSchema.parse(response);
    return parsedResponse;
};

const getBoard = async (boardId: BoardDto['id']) => {
    const path = `/boards/${boardId}`;
    const response = await makeRequest(path, { method: 'GET' });
    const parsedResponse = getBoardResponseSchema.parse(response);
    return parsedResponse;
};

export { getBoards, getBoard };
