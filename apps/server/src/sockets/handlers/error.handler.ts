import z, { ZodError } from 'zod';
import {
    BaseError,
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
    } else {
        callback({ success: false, error: new BaseError() });
    }
};

export { socketErrorHandler };
