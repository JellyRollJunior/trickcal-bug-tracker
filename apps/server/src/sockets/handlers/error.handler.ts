import z, { ZodError } from 'zod';
import {
    BaseError,
    DatabaseError,
    NotFoundError,
    SocketBaseResponse,
    ValidationError,
} from '@trickcal-bug-tracker/shared';

const socketErrorHandler = (
    error: Error | BaseError | unknown,
    callback: (response: SocketBaseResponse) => void
) => {
    if (error instanceof ZodError) {
        const validationError = new ValidationError(
            z.flattenError(error).fieldErrors
        );
        callback({ success: false, error: validationError });
    } else if (
        error instanceof BaseError ||
        error instanceof NotFoundError ||
        error instanceof DatabaseError
    ) {
        callback({ success: false, error: error });
    } else {
        callback({ success: false, error: new BaseError() });
    }
};

export { socketErrorHandler };
