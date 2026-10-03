function requireEnv(key: keyof ImportMetaEnv): string {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

const env = {
    serverBaseUrl: requireEnv('VITE_SERVER_BASE_URL'),
} as const;

export { env };
