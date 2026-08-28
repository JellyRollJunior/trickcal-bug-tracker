import { BaseError } from './BaseError.js';

class RateLimitError extends BaseError {
    timeoutInSeconds: number;

    constructor(timeoutInSeconds: number) {
        super('Rate limit error', 'Too many attempts, try again later', 429);
        this.timeoutInSeconds = timeoutInSeconds;
    }
}

export { RateLimitError };
