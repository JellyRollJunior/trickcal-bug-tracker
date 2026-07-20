import type { BaseError } from './BaseError.js';
import type { ValidationError } from './ValidationError.js';

const mapErrorToDto = (error: BaseError) => {
    return {
        status: error.status,
        name: error.name,
        message: error.message,
    };
};

const mapAuthenticationErrorToDto = mapErrorToDto;

const mapValidationErrorToDto = (error: ValidationError) => {
    return {
        ...mapErrorToDto(error),
        validationErrors: error.validationErrors,
    };
};

export { mapErrorToDto, mapAuthenticationErrorToDto, mapValidationErrorToDto };
