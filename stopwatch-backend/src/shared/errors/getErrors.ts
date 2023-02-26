import { NextFunction, Request, Response } from 'express';

import { envs } from '@shared/envs';
import { logger } from '@shared/providers/logger/implementations/PinoProvider';

import { AppError } from './AppError';

export function getErrors(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  logger.error(err.message, {
    err,
  });

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
      code: err.code,
    });
  }

  return response.status(500).json({
    status: 'error',
    message:
      envs.NODE_ENV === 'test' ? err.message : `Erro interno do servidor`,
  });
}
