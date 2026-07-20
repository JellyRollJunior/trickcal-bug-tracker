import type { Request, Response, NextFunction } from 'express';

const postSignup = async (
    _req: Request<{}, {}, {}>,
    res: Response,
    _next: NextFunction
) => {
    res.json("you signed up!")
};

export { postSignup };
