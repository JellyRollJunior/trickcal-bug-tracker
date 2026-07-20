import 'dotenv/config';

if (!process.env['PORT']) throw new Error('PORT is not set');
if (!process.env['DATABASE_URL']) throw new Error('DATABASE_URL is not set');

export const env = {
    port: process.env['PORT'],
    databaseUrl: process.env['DATABASE_URL'],
};
