import type { User } from '@prisma/client';
import type { UserDto } from '@trickcal-bug-tracker/shared';

const mapUserToDto = (user: User): UserDto => {
    return {
        id: user.id,
        name: user.name,
        role: user.role,
    };
};

export { mapUserToDto };
