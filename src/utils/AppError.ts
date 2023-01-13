import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  readonly statusCode: number;
  readonly status: string;
  readonly isOperational: boolean;
  readonly errorType: string;

  constructor(message: string, errorType: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errorType = errorType;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export enum CommonErrors {
  JOI_VALIDATION = 400,
}
