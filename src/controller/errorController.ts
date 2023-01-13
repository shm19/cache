import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/AppError';

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    req.logger.error(err);
    res.status(err.statusCode).json({ err });
  } else if (process.env.NODE_ENV === 'production') {
    req.logger.error(err);
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message, type: err.errType });
  }
};
