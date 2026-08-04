import type { User } from '@prisma/client';
import type { UserDto } from '@trickcal-bug-tracker/shared';

const toUserDto = (
    user: Pick<User, 'id' | 'name' | 'role'> & Record<string, string>
): UserDto => {
    return {
        id: user.id,
        name: user.name,
        role: user.role,
    };
};

export { toUserDto };
