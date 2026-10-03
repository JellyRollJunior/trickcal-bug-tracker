import z, { ZodError, type ZodType } from 'zod';
import { ValidationError } from '@trickcal-bug-tracker/shared';
import { resolveError } from '@/lib/resolveError.ts';
import { getToken } from '@/lib/TokenStorage.ts';
import { env } from '@/config/env.ts';

const BASE_URL = env.serverBaseUrl;

const getAuthHeader = (): HeadersInit => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const makeRequest = async (path: string, options: RequestInit = {}) => {
    const { headers, ...optionsWithoutHeaders } = options;
    const response = await fetch(`${BASE_URL}${path}`, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
            ...headers,
        },
        ...optionsWithoutHeaders,
    });

    // validate content type
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const body = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        resolveError(body);
    }
    return body;
};

const safeParse = <T>(schema: ZodType<T>, data: unknown): T => {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ValidationError(z.flattenError(error).fieldErrors);
        }
        throw error;
    }
};

export { makeRequest, safeParse };
