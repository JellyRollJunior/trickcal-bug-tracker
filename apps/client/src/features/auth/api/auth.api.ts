import z from 'zod';
import {
    postLoginRequestBodySchema,
    postLoginResponseSchema,
} from '@trickcal-bug-tracker/shared';
import { makeRequest } from '@/lib/apiClient.tsx';

type PostLoginParams = z.infer<typeof postLoginRequestBodySchema>;

const postLogin = async ({ username, password }: PostLoginParams) => {
    const path = '/login';
    const payload = { username, password };
    const parsedPayload = postLoginRequestBodySchema.parse(payload);
    const response = await makeRequest(path, {
        method: 'POST',        
        body: JSON.stringify(parsedPayload),
    });
    const parsedResponse = postLoginResponseSchema.parse(response);
    return parsedResponse;
};

export { postLogin };
