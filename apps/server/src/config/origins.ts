import { env } from '@/config/env.js';

const origins = [env.server_uri, env.client_uri];

export { origins };
