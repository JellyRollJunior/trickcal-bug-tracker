import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth/api/auth.api.ts';

const useMe = () =>
    useQuery({
        queryKey: ['me'],
        queryFn: getMe,
    });

export { useMe };
