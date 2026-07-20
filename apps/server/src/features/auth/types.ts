import type { User } from '@prisma/client';

type TokenPayload = Pick<User, 'id' | 'name' | 'role'>;

export type { TokenPayload };
