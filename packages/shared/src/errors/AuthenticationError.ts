import { BaseError } from './BaseError.js';

class AuthenticationError extends BaseError {
    constructor(message = 'Unable to authenticate credentials') {
        super('Authentication error', message, 401);
    }
}

export { AuthenticationError };
