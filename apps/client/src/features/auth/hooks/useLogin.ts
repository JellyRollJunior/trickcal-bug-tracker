import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/features/auth/api/auth.api.ts';

const useLogin = () => useMutation({ mutationFn: postLogin });

export { useLogin };
