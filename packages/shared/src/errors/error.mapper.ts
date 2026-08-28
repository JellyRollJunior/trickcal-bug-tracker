import type { BaseError } from './BaseError.js';
import type { RateLimitError } from './RateLimitError.js';
import type { ValidationError } from './ValidationError.js';

const toErrorDto = (error: BaseError) => {
    return {
        status: error.status,
        name: error.name,
        message: error.message,
    };
};

const toValidationErrorDto = (error: ValidationError) => {
    return {
        ...toErrorDto(error),
        validationErrors: error.validationErrors,
    };
};

const toRateLimitErrorDto = (error: RateLimitError) => {
    return {
        ...toErrorDto(error),
        timeoutInSeconds: error.timeoutInSeconds,
    };
};

export { toErrorDto, toValidationErrorDto, toRateLimitErrorDto };
