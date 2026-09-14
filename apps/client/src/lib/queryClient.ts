import { QueryClient } from '@tanstack/react-query';
import { AuthenticationError, ValidationError } from '@trickcal-bug-tracker/shared';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: true,
            retry: (failureCount, error) => {
                if (error instanceof AuthenticationError) return false; // don't retry on 401
                if (error instanceof ValidationError) return false; // don't retry on 400
                return failureCount < 2; // else, retry once
            },
        },
        mutations: {
            retry: 0,
        },
    },
});

export { queryClient };
