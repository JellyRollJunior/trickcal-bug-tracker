import 'dotenv/config';

if (!process.env['PORT']) throw new Error('PORT is not set');
if (!process.env['TOKEN_SECRET']) throw new Error('TOKEN_SECRET is not set');

// origins
if (!process.env['SERVER_URI']) throw new Error('SERVER_URI is not set');
if (!process.env['CLIENT_URI']) throw new Error('CLIENT_URI is not set');

// Postgres
if (!process.env['DATABASE_URL']) throw new Error('DATABASE_URL is not set');

// Redis
if (!process.env['REDIS_URL']) throw new Error('REDIS_URL is not set');

// Socket
if (!process.env['SOCKET_ADMIN_USERNAME']) throw new Error('SOCKET_ADMIN_USERNAME is not set')
if (!process.env['SOCKET_ADMIN_PASSWORD']) throw new Error('SOCKET_ADMIN_PASSWORD is not set')

// Github Oauth
if (!process.env['GITHUB_CLIENT_ID']) throw new Error('GITHUB_CLIENT_ID is not set');
if (!process.env['GITHUB_CLIENT_SECRET']) throw new Error('GITHUB_CLIENT_SECRET is not set');

// Google OAuth
if (!process.env['GOOGLE_CLIENT_ID']) throw new Error('GOOGLE_CLIENT_ID is not set');
if (!process.env['GOOGLE_CLIENT_SECRET']) throw new Error('GOOGLE_CLIENT_SECRET is not set');

export const env = {
    port: process.env['PORT'],
    tokenSecret: process.env['TOKEN_SECRET'],

    // origins
    server_uri: process.env['SERVER_URI'],
    client_uri: process.env['CLIENT_URI'],
    
    // Postgres
    databaseUrl: process.env['DATABASE_URL'],
    
    // Redis
    redisUrl: process.env['REDIS_URL'],

    // Socket
    socketAdminUsername: process.env['SOCKET_ADMIN_USERNAME'],
    socketAdminPassword: process.env['SOCKET_ADMIN_PASSWORD'],
    
    // OAuth
    sessionSecret: process.env['SESSION_SECRET'],

    // GitHub OAuth
    githubClientId: process.env['GITHUB_CLIENT_ID'],
    githubClientSecret: process.env['GITHUB_CLIENT_SECRET'],

    // Google OAuth
    googleClientId: process.env['GOOGLE_CLIENT_ID'],
    googleClientSecret: process.env['GOOGLE_CLIENT_SECRET'],
};
