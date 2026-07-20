import type { Errback, NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { BaseError } from '@trickcal-bug-tracker/shared';
import { ValidationError } from '@trickcal-bug-tracker/shared';
import { mapErrorToDto, mapValidationErrorToDto } from '@trickcal-bug-tracker/shared';

const errorHandler404 = (_req: Request, res: Response, _next: NextFunction) => {
    const error404 = new BaseError(
        '404 Not Found',
        'Invalid route detected. Consult the README for a list of valid routes',
        404
    );
    const errorDto = mapErrorToDto(error404);
    res.status(errorDto.status).json(errorDto);
};

const errorHandler = (
    err: Errback,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ZodError) {
        const validationError = new ValidationError(
            z.flattenError(err).fieldErrors
        );
        const validationErrorDto = mapValidationErrorToDto(validationError);
        res.status(validationErrorDto.status).json(validationErrorDto);
    } else if (err instanceof BaseError) {
        const errorDto = mapErrorToDto(err);
        res.status(errorDto.status).json(errorDto);
    } else {
        const errorDto = mapErrorToDto(new BaseError());
        res.status(errorDto.status).json(errorDto);
    }
};

export { errorHandler404, errorHandler };
