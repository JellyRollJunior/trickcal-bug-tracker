import type { Application } from 'express'
import express from 'express';
import cors from 'cors';

const app: Application = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
