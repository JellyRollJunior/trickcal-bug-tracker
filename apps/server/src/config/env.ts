import 'dotenv/config';

if (!process.env['PORT']) throw new Error('PORT is not set');
if (!process.env['DATABASE_URL']) throw new Error('DATABASE_URL is not set');
if (!process.env['TOKEN_SECRET']) throw new Error('TOKEN_SECRET is not set');

// Redis
if (!process.env['REDIS_URL']) throw new Error('REDIS_URL is not set');

// Socket
if (!process.env['SOCKET_ADMIN_USERNAME']) throw new Error('SOCKET_ADMIN_USERNAME is not set')
if (!process.env['SOCKET_ADMIN_PASSWORD']) throw new Error('SOCKET_ADMIN_PASSWORD is not set')

// Github Oauth
if (!process.env['GITHUB_CLIENT_ID']) throw new Error('GITHUB_CLIENT_ID is not set');
if (!process.env['GITHUB_CLIENT_SECRET']) throw new Error('GITHUB_CLIENT_SECRET is not set');
if (!process.env['GITHUB_CALLBACK_URL']) throw new Error('GITHUB_CALLBACK_URL is not set');

// Google OAuth
if (!process.env['GOOGLE_CLIENT_ID']) throw new Error('GOOGLE_CLIENT_ID is not set');
if (!process.env['GOOGLE_CLIENT_SECRET']) throw new Error('GOOGLE_CLIENT_SECRET is not set');
if (!process.env['GOOGLE_CALLBACK_URL']) throw new Error('GOOGLE_CALLBACK_URL is not set');

export const env = {
    port: process.env['PORT'],
    databaseUrl: process.env['DATABASE_URL'],
    tokenSecret: process.env['TOKEN_SECRET'],

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
    githubCallbackUrl: process.env['GITHUB_CALLBACK_URL'],

    // Google OAuth
    googleClientId: process.env['GOOGLE_CLIENT_ID'],
    googleClientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    googleCallbackUrl: process.env['GOOGLE_CALLBACK_URL'],
};
