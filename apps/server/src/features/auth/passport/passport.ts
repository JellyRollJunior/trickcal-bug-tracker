import passport from 'passport';
import { localStrategy } from '@/features/auth/passport/localStrategy.js';
import { githubStrategy } from '@/features/auth/passport/githubStrategy.js';
import { jwtStrategy } from '@/features/auth/passport/jwtStrategy.js';

passport.use(localStrategy);
passport.use(githubStrategy);
passport.use(jwtStrategy);

export { passport };
