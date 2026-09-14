import { makeRequest } from '@/lib/apiClient.ts';

const getBoards = async (token: string) => {
    const path = '/boards';
    const data = await makeRequest(path, {
        method: 'GET',
        headers: { Authorization: `bearer ${token}` },
    });
    return data;
};

export { getBoards };
