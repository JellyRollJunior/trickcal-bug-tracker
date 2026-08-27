import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from '@/lib/redis/redisClient.js';

// 10 fails per 15 mins, block for 15 mins
const loginLimiterByIp = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login-fail-ip',
    points: 10,
    duration: 60 * 15,
    blockDuration: 60 * 15,
});

// 5 fails per 15 mins, block for 30 mins
const loginLimiterByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login-fail-email',
    points: 5,
    duration: 60 * 15,
    blockDuration: 60 * 30,
});

export { loginLimiterByIp, loginLimiterByEmail };
