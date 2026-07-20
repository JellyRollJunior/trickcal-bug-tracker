import type { Application } from 'express'
import express from 'express';
import cors from 'cors';
import { authRouter } from '@/features/auth/router.js';

const app: Application = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);

export { app };
