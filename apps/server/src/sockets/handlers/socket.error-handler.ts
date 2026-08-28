import z, { ZodError } from 'zod';
import {
    BaseError,
    DatabaseError,
    toErrorDto,
    toValidationErrorDto,
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
        const errorDto = toValidationErrorDto(validationError);
        callback({ success: false, error: errorDto });
    } else if (error instanceof ValidationError) {
        const errorDto = toValidationErrorDto(error);
        callback({ success: false, error: errorDto });
    } else if (
        error instanceof BaseError ||
        error instanceof NotFoundError ||
        error instanceof DatabaseError
    ) {
        const errorDto = toErrorDto(error);
        callback({ success: false, error: errorDto });
    } else {
        callback({ success: false, error: new BaseError() });
    }
};

export { socketErrorHandler };
