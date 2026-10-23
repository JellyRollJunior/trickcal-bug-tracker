import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth/api/auth.api.ts';

const useMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
    });
};

const useMeAuthCheck = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });
};

export { useMe, useMeAuthCheck };
