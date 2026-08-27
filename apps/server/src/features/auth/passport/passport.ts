import passport from 'passport';
import { localStrategy } from '@/features/auth/passport/localStrategy.js';
import { githubStrategy } from '@/features/auth/passport/githubStrategy.js';
import { googleStrategy } from '@/features/auth/passport/googleStrategy.js';
import { jwtStrategy } from '@/features/auth/passport/jwtStrategy.js';

passport.use(localStrategy);
passport.use(githubStrategy);
passport.use(googleStrategy);
passport.use(jwtStrategy);

export { passport };
