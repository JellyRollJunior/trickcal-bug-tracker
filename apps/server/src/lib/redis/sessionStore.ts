import { RedisStore } from "connect-redis";
import { redisClient } from "@/lib/redis/redisClient.js";

const sessionStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

export { sessionStore }