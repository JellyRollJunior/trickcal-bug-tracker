import { QueryClient, QueryCache } from '@tanstack/react-query';
import { AuthenticationError, BaseError } from '@trickcal-bug-tracker/shared';
import { router } from '@/routes/router.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: true,
            retry: (failureCount, error) => {
                if (error instanceof BaseError && error.status < 500)
                    return false; // on known error, don't retry
                return failureCount < 2; // else, retry once
            },
        },
        mutations: {
            retry: 0,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof AuthenticationError) {
                // notify user of authentication error
                const currentPath = router.state.location.pathname;
                if (currentPath !== '/auth/login') {
                    router.navigate('/auth/login', { replace: true });
                }
            }
        },
    }),
});

export { queryClient };
