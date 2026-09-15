import { boardDtoSchema } from '@trickcal-bug-tracker/shared';
import { makeRequest } from '@/lib/apiClient.ts';

const getBoards = async () => {
    const path = '/boards';
    const response = await makeRequest(path, {
        method: 'GET',
    });
    const parsedResponse = boardDtoSchema.array().parse(response);
    return parsedResponse;
};

export { getBoards };
