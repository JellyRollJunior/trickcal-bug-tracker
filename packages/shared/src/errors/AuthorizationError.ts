import { BaseError } from './BaseError.js';

class AuthorizationError extends BaseError {
    constructor(message = 'Unable to authorize resource') {
        super('Authorization error', message, 403);
    }
}

export { AuthorizationError };
