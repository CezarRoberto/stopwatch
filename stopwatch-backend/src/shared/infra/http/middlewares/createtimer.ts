import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

export async function ensureCodeIsEnough(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { code } = request.body;

    if (code.length < 6) {
        throw new AppError('Invalid token', 401, 'INVALID_TOKEN');
    }

    next();
}
