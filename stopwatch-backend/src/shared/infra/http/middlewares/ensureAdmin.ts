import { NextFunction, Request, Response } from 'express';

import { envs } from '@shared/envs';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { token } = request.headers;
    if (!token) {
        throw new AppError('Token not provided', 401, 'MISSING_TOKEN');
    }

    if (token !== envs.ADMIN_API_KEY) {
        throw new AppError('Invalid token', 401, 'INVALID_TOKEN');
    }

    next();
}
