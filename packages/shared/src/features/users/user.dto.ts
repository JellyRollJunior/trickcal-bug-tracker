import { z } from 'zod';
import { userSchema } from './user.schema.js';

const UserDtoSchema = z.object({
    id: userSchema.id,
    name: userSchema.name,
    role: userSchema.role,
});

type UserDto = z.infer<typeof UserDtoSchema>;

export type { UserDto };
export { UserDtoSchema };
