import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { env } from '@/config/env.js';
import { passport } from '@/features/auth/passport/passport.js'
import { authRouter } from '@/features/auth/router.js';
import { errorHandler404, errorHandler } from './middleware/ErrorHandler.js';

const app: Application = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure sessions for oauth
app.use(session({
    secret: env.sessionSecret ?? '',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRouter);

// error handlers
app.use(/(.*)/, errorHandler404);
app.use(errorHandler);

export { app };
