import z from 'zod';
import {
    postLoginRequestBodySchema,
    postLoginResponseSchema,
} from '@trickcal-bug-tracker/shared';
import { makeRequest, safeParse } from '@/lib/apiClient.ts';

type PostLoginParams = z.infer<typeof postLoginRequestBodySchema>;

const postLogin = async ({ username, password }: PostLoginParams) => {
    const path = '/auth/login';
    const payload = { username, password };
    const parsedPayload = safeParse(postLoginRequestBodySchema, payload);
    const response = await makeRequest(path, {
        method: 'POST',
        body: JSON.stringify(parsedPayload),
    });
    const parsedResponse = safeParse(postLoginResponseSchema, response);
    return parsedResponse;
};

export { postLogin };
