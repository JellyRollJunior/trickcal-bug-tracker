const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const makeRequest = async (path: string, options: RequestInit) => {
    const response = await fetch(`${BASE_URL}${path}`, options);
    if (!response.ok) {
        throw Error('response error');
    }
    return response.json();
};

export { makeRequest };
