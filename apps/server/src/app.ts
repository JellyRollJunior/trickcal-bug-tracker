import type { Application } from 'express';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { env } from '@/config/env.js';
import { sessionStore } from '@/lib/redis/sessionStore.js';
import { passport } from '@/features/auth/passport/passport.js'
import { authRouter } from '@/features/auth/auth.router.js';
import { boardRouter } from '@/features/boards/board.router.js';
import { sectionRouter } from '@/features/sections/section.router.js';
import { ticketRouter } from '@/features/tickets/ticket.router.js';
import { errorHandler404, errorHandler } from '@/middleware/errorHandler.js';

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
    store: sessionStore,
    secret: env.sessionSecret ?? '',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRouter);
app.use('/boards', boardRouter);
app.use('/sections', sectionRouter);
app.use('/tickets', ticketRouter);

// error handlers
app.use(/(.*)/, errorHandler404);
app.use(errorHandler);

export { app };
