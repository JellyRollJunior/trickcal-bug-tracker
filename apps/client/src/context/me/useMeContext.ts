import { useContext } from 'react';
import { MeContext } from '@/context/me/MeContext.tsx';

const useMeContext = () => {
    const context = useContext(MeContext);
    if (!context) throw new Error('useMe must be used within MeProvider');
    return context;
};

export { useMeContext };
