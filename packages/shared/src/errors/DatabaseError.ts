import { BaseError } from './BaseError.js';

class DatabaseError extends BaseError {
    constructor(message = 'Unable to process request') {
        super('Database error', message, 500);
    }
}

export { DatabaseError };
