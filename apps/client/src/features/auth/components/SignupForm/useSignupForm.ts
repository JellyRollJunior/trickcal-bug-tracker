import { useState, type SubmitEvent } from 'react';
import { useSignUp } from '../../hooks/useSignUp.ts';
import { toast } from 'sonner';

const useSignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const { mutate: signup, isPending: isPendingSignup } = useSignUp();

    const handleSignup = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            toast.error('Passwords must match');
            return;
        }

        signup(
            { data: { username, password, name } },
            {
                onSuccess: (user) => {
                    toast(`Signup for ${user.name} successful`);
                },
            }
        );
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        name,
        setName,
        handleSignup,
        isPendingSignup,
    };
};

export { useSignupForm };
