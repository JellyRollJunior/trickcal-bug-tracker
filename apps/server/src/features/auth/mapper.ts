import type { User } from '@prisma/client';
import type { TokenPayload } from '@/features/auth/types.js';

const mapUserToTokenPayload = (user: User): TokenPayload => {
    return {
        id: user.id,
        name: user.name,
        role: user.role,
    };
};

export { mapUserToTokenPayload };
