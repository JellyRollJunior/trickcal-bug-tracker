import {
    AuthenticationError,
    BaseError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { toast } from 'sonner';

const handleError = (error: unknown) => {
    if (error instanceof AuthenticationError) {
        // notify user of authentication error
        const currentPath = window.location.pathname;
        if (currentPath !== '/auth/login') {
            window.location.replace('/auth/login')
        }
        toast.error('Unable to validate login');
    } else if (error instanceof ValidationError) {
        // Convert validation errors to [errorFieldName: errorDescription, ...]
        const validationErrorsStringified = Object.keys(
            error.validationErrors
        ).map((key) => `${key}: ${error.validationErrors[key]}`);
        toast.error(
            `${error.name} - [${validationErrorsStringified.join(', ')}]`
        );
    } else if (error instanceof BaseError) {
        toast.error(`${error.name} - ${error.message}`);
    } else {
        toast.error(`Unknown error - Something went wrong`);
    }
};

export { handleError };
