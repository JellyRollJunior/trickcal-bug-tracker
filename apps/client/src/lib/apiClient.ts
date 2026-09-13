import { resolveError } from '@/lib/resolveError.ts';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const makeRequest = async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_URL}${path}`, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
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

export { makeRequest };
