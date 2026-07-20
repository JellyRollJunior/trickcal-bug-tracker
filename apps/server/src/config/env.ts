import 'dotenv/config';

if (!process.env['PORT']) throw new Error('PORT is not set');
if (!process.env['DATABASE_URL']) throw new Error('DATABASE_URL is not set');
if (!process.env['TOKEN_SECRET']) throw new Error('TOKEN_SECRET is not set');

export const env = {
    port: process.env['PORT'],
    databaseUrl: process.env['DATABASE_URL'],
    tokenSecret: process.env['TOKEN_SECRET'],

    // GitHub oauth
    sessionSecret: process.env['SESSION_SECRET'],
    githubClientId: process.env['GITHUB_CLIENT_ID'],
    githubClientSecret: process.env['GITHUB_CLIENT_SECRET'],
};
