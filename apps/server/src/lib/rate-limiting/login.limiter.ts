import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from '@/lib/redis/redisClient.js';

// 10 fails per 15 mins, block for 15 mins
const loginLimiterByIp = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: 'login-fail-ip',
    points: 10,
    duration: 60 * 15,
    blockDuration: 60 * 15,
});

// 5 fails per 15 mins, block for 30 mins
const loginLimiterByUsername = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: 'login-fail-username',
    points: 5,
    duration: 60 * 15,
    blockDuration: 60 * 30,
});

const IP_FALLBACK_KEY = 'unknown-ip';

const consumeLoginPoints = async (
    ip: string | undefined,
    username: string,
    points = 1
) => {
    await Promise.all([
        loginLimiterByIp.consume(ip ?? IP_FALLBACK_KEY, points).catch(() => {}),
        loginLimiterByUsername.consume(username, points).catch(() => {}),
    ]);
};

const resetLoginPoints = async (ip: string | undefined, username: string) => {
    await Promise.all([
        loginLimiterByIp.delete(ip ?? IP_FALLBACK_KEY).catch(() => {}),
        loginLimiterByUsername.delete(username).catch(() => {}),
    ]);
};

export {
    IP_FALLBACK_KEY,
    loginLimiterByIp,
    loginLimiterByUsername,
    consumeLoginPoints,
    resetLoginPoints,
};
