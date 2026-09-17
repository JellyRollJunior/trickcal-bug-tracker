import {
    knownErrorSchema,
    baseErrorSchema,
    BaseError,
    AuthenticationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    RateLimitError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';

const resolveError = (body: unknown): never => {
    const knownError = knownErrorSchema.safeParse(body);

    if (knownError.success) {
        switch (knownError.data.name) {
            case 'Validation Error':
                throw new ValidationError(knownError.data.validationErrors);
            case 'Rate limit error':
                throw new RateLimitError(knownError.data.timeoutInSeconds);
            case 'Authentication error':
                throw new AuthenticationError(knownError.data.message);
            case 'Authorization error':
                throw new AuthorizationError(knownError.data.message);
            case 'Database error':
                throw new DatabaseError(knownError.data.message);
            case '404 not found':
                throw new NotFoundError(knownError.data.message);
        }
    }

    const fallback = baseErrorSchema.safeParse(body);
    if (fallback.success) {
        throw new BaseError(
            fallback.data.name,
            fallback.data.message,
            fallback.data.status
        );
    }

    throw new BaseError('Unknown Error', 'Unknown response from server', 520);
};

export { resolveError };
