import { createServer } from 'node:http';
import { app } from '@/app.js';
import { env } from '@/config/env.js';

const server = createServer(app);

server.listen(Number(env.port), '0.0.0.0', () => {
    console.log(`Listening on port: ${env.port}`);
});
