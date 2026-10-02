import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@/features/auth/api/auth.api.ts';

const useSignUp = () => useMutation({ mutationFn: postSignup });

export { useSignUp };
