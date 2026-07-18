import { createServer } from 'node:http';
import { app } from '@/app.js';

const server = createServer(app);

server.listen(3000, '0.0.0.0', () => {
    console.log(`Listening on port: 3000`);
});
