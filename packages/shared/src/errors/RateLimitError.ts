import { BaseError } from './BaseError.js';

class RateLimitError extends BaseError {
    constructor(message = 'Too many attempts, try again later') {
        super('Rate limit error', message, 429);
    }
}

export { RateLimitError };
