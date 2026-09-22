import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { BaseError } from '@trickcal-bug-tracker/shared';
import { toastError } from '@/lib/toastError.ts';

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
    queryCache: new QueryCache({ onError: toastError }),
    mutationCache: new MutationCache({ onError: toastError }),
});

export { queryClient };
