import { BaseError } from './BaseError.js';

class ValidationError extends BaseError {
    validationErrors: Record<string, string[]>;
    
    constructor(validationErrors: Record<string, string[]>) {
        super('Validation Error', 'Error validating client input', 400);
        this.validationErrors = validationErrors;
    }
}

export { ValidationError };
