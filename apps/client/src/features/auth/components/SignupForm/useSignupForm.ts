import { useState, type SubmitEvent } from 'react';

const useSignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleSignup,
        isPendingSignup: false,
    };
};

export { useSignupForm };
