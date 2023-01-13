import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/AppError';

export const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorObj = { ...error, message: error.message };
  if (process.env.NODE_ENV === 'development') {
    req.logger.error(errorObj);
    res.status(error.statusCode).json(errorObj);
  } else if (process.env.NODE_ENV === 'production') {
    req.logger.error(error);
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      type: error.errorType,
    });
  } else {
    req.logger.info(errorObj);
    res.status(error.statusCode).json(errorObj);
  }
};
