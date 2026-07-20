import passport from 'passport';
import { localStrategy } from '@/features/auth/passport/localStrategy.js';
import { githubStrategy } from '@/features/auth/passport/githubStrategy.js';

passport.use(localStrategy);
passport.use(githubStrategy);

export { passport };
