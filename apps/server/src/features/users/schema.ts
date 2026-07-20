import { z } from 'zod';

// error messages
const LOWERCASE_ERROR_MESSAGE = 'must contain at least one lowercase letter';
const UPPERCASE_ERROR_MESSAGE = 'must contain at least one uppercase letter';
const NUMBER_ERROR_MESSAGE = 'must contain at least one number';
const SPECIAL_CHARACTER_ERROR_MESSAGE =
    'must contain at least one special character: !@#$%^&*';
const INVALID_CHARACTER_ERROR_MESSAGE = 'contains invalid characters: <>';

const usernameSchema = z
    .string()
    .min(8)
    .max(16)
    .regex(/^[^<>]*$/, {
        message: `username ${INVALID_CHARACTER_ERROR_MESSAGE}`,
    });

const passwordSchema = z
    .string()
    .min(8)
    .max(16)
    .refine((password) => /[A-Z]/.test(password), {
        message: `password ${UPPERCASE_ERROR_MESSAGE}`,
    })
    .refine((password) => /[a-z]/.test(password), {
        message: `password ${LOWERCASE_ERROR_MESSAGE}`,
    })
    .refine((password) => /[0-9]/.test(password), {
        message: `password ${NUMBER_ERROR_MESSAGE}`,
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: `password ${SPECIAL_CHARACTER_ERROR_MESSAGE}`,
    })
    .regex(/^[^<>]*$/, {
        message: `password ${INVALID_CHARACTER_ERROR_MESSAGE}`,
    });

const displayNameSchema = z
    .string()
    .min(1)
    .max(16)
    .regex(/^[^<>]*$/, {
        message: `displayName ${INVALID_CHARACTER_ERROR_MESSAGE}`,
    });

export { usernameSchema, passwordSchema, displayNameSchema };
