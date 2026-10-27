import { useMutation } from '@tanstack/react-query';
import { postLoginDemo } from '@/features/auth/api/auth.api.ts';

const useLoginDemo = () => useMutation({ mutationFn: postLoginDemo });

export { useLoginDemo };
