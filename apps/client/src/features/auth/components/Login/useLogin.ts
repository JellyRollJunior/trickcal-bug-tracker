import type { SubmitEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useLoginDemo } from '@/features/auth/hooks/useLoginDemo.ts';

const useLogin = () => {
    const { setToken } = useAuth();
    const { mutate: login, isPending: isPendingLoginDemo } = useLoginDemo();
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const redirectError = params.get('error');

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(undefined, {
            onSuccess: (data) => {
                setToken(data.token);
                navigate('/boards');
            },
            onError: (error) => {
                console.log(error);
                toast.error('Unable to login as demo user.');
            },
        });
    };

    return {
        isPendingLoginDemo,
        handleSubmit,
        redirectError,
        setParams,
    };
};

export { useLogin };
