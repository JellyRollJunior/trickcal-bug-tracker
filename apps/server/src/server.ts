import { createServer } from 'node:http';
import { app } from '@/app.js';
import { env } from '@/config/env.js';
import { configureSocketIo } from './sockets/configureSocketIo.js';

const server = createServer(app);

configureSocketIo(server);

server.listen(Number(env.port), '0.0.0.0', () => {
    console.log(`Listening on port: ${env.port}`);
});
