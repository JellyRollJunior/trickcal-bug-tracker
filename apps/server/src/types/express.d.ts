import type { TokenPayload } from '@/features/auth/types.js';

declare global {
    namespace Express {
        interface User extends TokenPayload {}
    }
}
