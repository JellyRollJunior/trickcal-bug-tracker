import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { env } from '@/config/env.js';

const createSocketIoRedisAdapter = async () => {
    const pubClient = createClient({ url: env.redisUrl });
    const subClient = pubClient.duplicate();

    pubClient.on('error', (err) => console.log('Redis pub client error', err));
    subClient.on('error', (err) => console.log('Redis sub client error', err));

    await Promise.all([pubClient.connect(), subClient.connect()]);

    return createAdapter(pubClient, subClient);
};

export { createSocketIoRedisAdapter };
