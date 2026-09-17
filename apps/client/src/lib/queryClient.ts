import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import {
    AuthenticationError,
    BaseError,
    ValidationError,
} from '@trickcal-bug-tracker/shared';
import { router } from '@/routes/router.tsx';
import { toast } from 'sonner';

const handleGlobalError = (error: unknown) => {
    if (error instanceof AuthenticationError) {
        // notify user of authentication error
        const currentPath = router.state.location.pathname;
        if (currentPath !== '/auth/login') {
            router.navigate('/auth/login', { replace: true });
        }
        toast.error('Login expired. Please login again. ');
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: true,
            retry: (failureCount, error) => {
                if (error instanceof BaseError && error.status < 500) {
                    return false; // on known error, don't retry
                }
                return failureCount < 2; // else, retry once
            },
        },
        mutations: {
            retry: 0,
        },
    },
    queryCache: new QueryCache({ onError: handleGlobalError }),
    mutationCache: new MutationCache({ onError: handleGlobalError }),
});

export { queryClient };
