import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';

/* Returns a middleware which validates request body using provided zod schema */
const validateRequestBody = <T>(
    validationSchema: ZodType<T, unknown>
): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const data = validationSchema.parse(req.body);
        req.body = data;
        next();
    };
};

export { validateRequestBody };
