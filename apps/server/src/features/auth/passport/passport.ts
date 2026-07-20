import passport from 'passport';
import { localStrategy } from '@/features/auth/passport/localStrategy.js';

passport.use(localStrategy);

export { passport };
