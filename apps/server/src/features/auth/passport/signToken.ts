import type { TokenPayload } from '@/features/auth/types.js';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env.js';

const signToken = (userTokenPayload: TokenPayload) => {
    const options = {
        expiresIn: 60 * 60,
    };
    const token = jwt.sign(userTokenPayload, env.tokenSecret ?? '', options);
    return token;
};

export { signToken };
