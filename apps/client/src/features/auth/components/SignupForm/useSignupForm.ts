import { useState, type SubmitEvent } from 'react';
import { passwordRegex } from '@trickcal-bug-tracker/shared';
import { toast } from 'sonner';
import { useSignUp } from '@/features/auth/hooks/useSignUp.ts';

const useSignupForm = () => {
    const { mutate: signup, isPending: isPendingSignup } = useSignUp();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    
    // errors
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState<boolean>(false);
    const [isPasswordRegexError, setIsPasswordRegexError] = useState<boolean>(false);

    const handleSignup = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validate password matches regex
        if (!passwordRegex.test(password)) {
            setIsPasswordRegexError(true);
        }

        // Validate password & confirm password match
        if (confirmPassword !== password) {
            setIsConfirmPasswordError(true);
        }

        if (isPasswordRegexError || isConfirmPasswordError) return;

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
        isPasswordRegexError,
        isConfirmPasswordError,
        handleSignup,
        isPendingSignup,
    };
};

export { useSignupForm };
