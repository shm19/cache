import { Request, Response, NextFunction } from 'express';
import { AppError, CommonErrors } from '../utils/AppError';
import HttpStatusCode from '../utils/HttpStatusCode';

export const joiValidate =
  (validator: Function) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error)
      return next(
        new AppError(
          error.details[0].message,
          CommonErrors[CommonErrors.JOI_VALIDATION],
          HttpStatusCode.BAD_REQUEST
        )
      );
    next();
  };
