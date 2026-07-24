import { BaseError } from './BaseError.js';

class NotFoundError extends BaseError {
    constructor(message = 'Unable to retrieve resource') {
        super('404 not found', message, 400);
    }
}

export { NotFoundError };
