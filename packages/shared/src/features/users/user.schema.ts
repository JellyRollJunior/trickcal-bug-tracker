import { z } from 'zod';
import { ROLE } from './user.enums.js';

// error messages
const INVALID_CHARACTER_ERROR_MESSAGE = 'contains invalid characters: <>';
const PASSWORD_ERROR_MESSAGE = "must contain at least one uppercase letter, one lowercase letter, one number, one special character (!@#$%^&*), and cannot contain '<' or '>'"

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[^<>]*$/;

const userShape = {
    id: z.uuid(),
    username: z
        .string()
        .min(8)
        .max(16)
        .regex(/^[^<>]*$/, {
            message: `username ${INVALID_CHARACTER_ERROR_MESSAGE}`,
        }),
    password: z
        .string()
        .min(8)
        .max(16)
        .regex(passwordRegex, {
            message: `Password ${PASSWORD_ERROR_MESSAGE}`,
        }),
    name: z
        .string()
        .min(1)
        .max(16)
        .regex(/^[^<>]*$/, {
            message: `name ${INVALID_CHARACTER_ERROR_MESSAGE}`,
        }),
    role: z.enum(ROLE),
};

const userDtoSchema = z.object({
    id: userShape.id,
    name: userShape.name,
    role: userShape.role,
});
type UserDto = z.infer<typeof userDtoSchema>;

export type { UserDto };
export { userShape, userDtoSchema, passwordRegex };
