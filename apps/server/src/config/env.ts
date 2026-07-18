import 'dotenv/config';

if (!process.env['PORT']) throw new Error('PORT is not set');

export const env = {
    port: process.env['PORT'],
};
