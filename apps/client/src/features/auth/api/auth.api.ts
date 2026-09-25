import z from 'zod';
import {
    getMeResponseSchema,
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

const getMe = async () => {
    const path = '/users/me';
    const response = await makeRequest(path, {
        method: 'GET',
    });
    const parsedResponse = safeParse(getMeResponseSchema, response);
    return parsedResponse;
};

export { postLogin, getMe };
